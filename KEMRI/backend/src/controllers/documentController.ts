import { Request, Response } from 'express';
import { prisma } from '../index';

interface AuthRequest extends Request {
  user?: any;
}

export const createDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { title, subject, content, recipientIds } = req.body;
    const senderId = req.user.userId;

    // Create document
    const document = await prisma.document.create({
      data: {
        title,
        subject,
        content,
        sender: { connect: { id: senderId } },
        recipients: {
          connect: recipientIds.map((id: string) => ({ id })),
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipients: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Handle file uploads if any
    if (req.files && Array.isArray(req.files)) {
      const filePromises = (req.files as Express.Multer.File[]).map(async (file) => {
        return prisma.attachment.create({
          data: {
            filename: file.originalname,
            path: file.path,
            mimeType: file.mimetype,
            size: file.size,
            document: { connect: { id: document.id } },
          },
        });
      });

      await Promise.all(filePromises);
    }

    res.status(201).json(document);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    let documents;

    if (role === 'ADMIN') {
      // Admins can see all documents
      documents = await prisma.document.findMany({
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          recipients: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          attachments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      // Regular users can only see documents they sent or received
      documents = await prisma.document.findMany({
        where: {
          OR: [
            { senderId: userId },
            { recipients: { some: { id: userId } } },
          ],
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          recipients: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          attachments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    res.json(documents);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getDocumentById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipients: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attachments: true,
      },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if user has permission to view this document
    if (role !== 'ADMIN' && 
        document.senderId !== userId && 
        !document.recipients.some(recipient => recipient.id === userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(document);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateDocumentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;
    const role = req.user.role;

    // Only admins and the document recipients can update status
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        recipients: {
          select: { id: true },
        },
      },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (role !== 'ADMIN' && !document.recipients.some(recipient => recipient.id === userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: { status },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipients: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attachments: true,
      },
    });

    res.json(updatedDocument);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 