'use client';

import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';

// ... existing code ... 
// This is your Prisma schema file

// generator client {
//     provider = "prisma-client-js"
//   }
  
//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }
  
//   model User {
//     id            String    @id @default(uuid())
//     email         String    @unique
//     name          String
//     password      String
//     role          Role      @default(USER)
//     department    String?
//     createdAt     DateTime  @default(now())
//     updatedAt     DateTime  @updatedAt
//     sentDocuments     Document[] @relation("SentDocuments")
//     receivedDocuments Document[] @relation("ReceivedDocuments")
//   }
  
//   model Document {
//     id            String    @id @default(uuid())
//     title         String
//     subject       String
//     content       String
//     status        Status    @default(PENDING)
//     createdAt     DateTime  @default(now())
//     updatedAt     DateTime  @updatedAt
//     senderId      String
//     sender        User      @relation("SentDocuments", fields: [senderId], references: [id])
//     recipients    User[]    @relation("ReceivedDocuments")
//     attachments   Attachment[]
//   }
  
//   model Attachment {
//     id          String    @id @default(uuid())
//     filename    String
//     path        String
//     mimeType    String
//     size        Int
//     documentId  String
//     document    Document  @relation(fields: [documentId], references: [id], onDelete: Cascade)
//     uploadedAt  DateTime  @default(now())
//   }
  
//   enum Role {
//     USER
//     ADMIN
//     MANAGER
//   }
  
//   enum Status {
//     PENDING
//     APPROVED
//     REJECTED
//     IN_REVIEW
//   }