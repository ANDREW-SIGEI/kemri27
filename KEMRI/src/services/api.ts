import { Document, DocumentStats, APIResponse, Annotation } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // In a real app, you would get this from your auth context/store
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

export const documentsApi = {
  // Document CRUD operations
  getDocuments: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
  }): Promise<APIResponse<Document[]>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    return fetchWithAuth(`/documents?${queryParams.toString()}`);
  },

  getDocument: async (id: string): Promise<APIResponse<Document>> => {
    return fetchWithAuth(`/documents/${id}`);
  },

  createDocument: async (document: Partial<Document>): Promise<APIResponse<Document>> => {
    return fetchWithAuth('/documents', {
      method: 'POST',
      body: JSON.stringify(document),
    });
  },

  updateDocument: async (id: string, updates: Partial<Document>): Promise<APIResponse<Document>> => {
    return fetchWithAuth(`/documents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  deleteDocument: async (id: string): Promise<APIResponse<void>> => {
    return fetchWithAuth(`/documents/${id}`, {
      method: 'DELETE',
    });
  },

  // Document file operations
  uploadFile: async (documentId: string, file: File): Promise<APIResponse<{ fileUrl: string }>> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchWithAuth(`/documents/${documentId}/upload`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type here, let the browser set it with the boundary
      },
      body: formData,
    });
  },

  downloadFile: async (documentId: string): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    return response.blob();
  },

  // Annotation operations
  addAnnotation: async (
    documentId: string,
    annotation: Omit<Annotation, 'id' | 'documentId' | 'createdAt'>
  ): Promise<APIResponse<Annotation>> => {
    return fetchWithAuth(`/documents/${documentId}/annotations`, {
      method: 'POST',
      body: JSON.stringify(annotation),
    });
  },

  deleteAnnotation: async (documentId: string, annotationId: string): Promise<APIResponse<void>> => {
    return fetchWithAuth(`/documents/${documentId}/annotations/${annotationId}`, {
      method: 'DELETE',
    });
  },

  // Analytics and statistics
  getStats: async (timeframe: 'month' | 'year' | 'all'): Promise<APIResponse<DocumentStats>> => {
    return fetchWithAuth(`/stats?timeframe=${timeframe}`);
  },
};

// Error handling utility
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
} 