import express from 'express';
import { 
  createDocument, 
  getAllDocuments, 
  getDocumentById, 
  updateDocumentStatus 
} from '../controllers/documentController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Apply authentication middleware to all document routes
router.use(authenticateToken);

// Document routes
router.post('/', upload.array('attachments', 5), createDocument);
router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);
router.patch('/:id/status', updateDocumentStatus);

export default router; 