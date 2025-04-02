'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    sender?: string;
    recipient?: string;
    receivedDate?: string;
    sentDate?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    category: string;
    fileUrl?: string;
  };
  onDownload?: () => void;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  document,
  onDownload,
}: DocumentPreviewModalProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            <Dialog.Portal>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-4 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
                >
                  <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{document.title}</h2>
                        <p className="text-sm text-gray-500">ID: {document.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Document Details</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500">Category</dt>
                            <dd className="text-sm font-medium text-gray-900">{document.category}</dd>
                          </div>
                          {document.sender && (
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Sender</dt>
                              <dd className="text-sm font-medium text-gray-900">{document.sender}</dd>
                            </div>
                          )}
                          {document.recipient && (
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Recipient</dt>
                              <dd className="text-sm font-medium text-gray-900">{document.recipient}</dd>
                            </div>
                          )}
                          {document.receivedDate && (
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Received Date</dt>
                              <dd className="text-sm font-medium text-gray-900">{document.receivedDate}</dd>
                            </div>
                          )}
                          {document.sentDate && (
                            <div className="flex justify-between">
                              <dt className="text-sm text-gray-500">Sent Date</dt>
                              <dd className="text-sm font-medium text-gray-900">{document.sentDate}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Status Information</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between items-center">
                            <dt className="text-sm text-gray-500">Status</dt>
                            <dd className="flex items-center space-x-2">
                              {getStatusIcon(document.status)}
                              <span className="text-sm font-medium text-gray-900 capitalize">{document.status}</span>
                            </dd>
                          </div>
                          <div className="flex justify-between items-center">
                            <dt className="text-sm text-gray-500">Priority</dt>
                            <dd>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(document.priority)}`}>
                                {document.priority}
                              </span>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {document.fileUrl && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Document Preview</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <DocumentViewer fileUrl={document.fileUrl} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-6 border-t">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={onDownload}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
} 