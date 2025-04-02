export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  priority: DocumentPriority;
  createdAt: string;
  updatedAt: string;
  sender?: string;
  recipient?: string;
  fileUrl?: string;
  annotations: Annotation[];
  metadata: DocumentMetadata;
}

export type DocumentType = 
  | 'RESEARCH_PROPOSAL'
  | 'ETHICS_REVIEW'
  | 'PROGRESS_REPORT'
  | 'FINAL_REPORT'
  | 'OTHER';

export type DocumentStatus = 
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

export type DocumentPriority = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

export interface Annotation {
  id: string;
  documentId: string;
  pageNumber: number;
  x: number;
  y: number;
  text: string;
  createdAt: string;
  createdBy: string;
}

export interface DocumentMetadata {
  authors?: string[];
  institution?: string;
  department?: string;
  submissionDate?: string;
  reviewDueDate?: string;
  keywords?: string[];
  version?: string;
  reviewers?: string[];
}

export interface DocumentStats {
  totalDocuments: number;
  pendingReview: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  averageProcessingTime: number;
  documentsByType: {
    type: DocumentType;
    count: number;
  }[];
  documentsByStatus: {
    status: DocumentStatus;
    count: number;
  }[];
  monthlyTrends: {
    month: string;
    incoming: number;
    outgoing: number;
  }[];
}

export interface APIResponse<T> {
  data: T;
  error?: string;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
} 