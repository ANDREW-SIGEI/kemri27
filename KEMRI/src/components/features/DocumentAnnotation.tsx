import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Save, Trash2 } from 'lucide-react';

interface Annotation {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  text: string;
  createdAt: string;
  createdBy: string;
}

interface DocumentAnnotationProps {
  pageNumber: number;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => void;
  onDeleteAnnotation: (id: string) => void;
  className?: string;
}

export default function DocumentAnnotation({
  pageNumber,
  annotations,
  onAddAnnotation,
  onDeleteAnnotation,
  className = '',
}: DocumentAnnotationProps) {
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [annotationPosition, setAnnotationPosition] = useState<{ x: number; y: number } | null>(null);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingAnnotation) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setAnnotationPosition({ x, y });
  };

  const handleSaveAnnotation = () => {
    if (!annotationPosition || !annotationText) return;

    onAddAnnotation({
      pageNumber,
      x: annotationPosition.x,
      y: annotationPosition.y,
      text: annotationText,
      createdBy: 'Current User', // In a real app, this would come from auth context
    });

    setIsAddingAnnotation(false);
    setAnnotationText('');
    setAnnotationPosition(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Annotation Layer */}
      <div
        className="absolute inset-0 cursor-crosshair"
        onClick={handlePageClick}
      >
        {/* Existing Annotations */}
        {annotations
          .filter((annotation) => annotation.pageNumber === pageNumber)
          .map((annotation) => (
            <motion.div
              key={annotation.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute"
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
              }}
            >
              <div className="relative group">
                <button
                  className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                {/* Annotation Popup */}
                <div className="absolute left-full ml-2 top-0 hidden group-hover:block bg-white rounded-lg shadow-lg p-3 w-64 z-10">
                  <div className="text-sm text-gray-600 mb-1">
                    {annotation.createdBy} • {new Date(annotation.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-gray-800">{annotation.text}</div>
                  <button
                    onClick={() => onDeleteAnnotation(annotation.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

        {/* New Annotation Input */}
        {annotationPosition && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute"
            style={{
              left: `${annotationPosition.x}%`,
              top: `${annotationPosition.y}%`,
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-3 w-64 transform -translate-x-1/2 -translate-y-full mb-2">
              <textarea
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                placeholder="Add your annotation..."
                className="w-full h-24 text-sm border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsAddingAnnotation(false);
                    setAnnotationText('');
                    setAnnotationPosition(null);
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAnnotation}
                  disabled={!annotationText}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Toggle Annotation Mode Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddingAnnotation(!isAddingAnnotation)}
        className={`absolute top-4 right-4 px-3 py-2 rounded-md flex items-center space-x-2 ${
          isAddingAnnotation
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm">{isAddingAnnotation ? 'Adding Annotation' : 'Add Annotation'}</span>
      </motion.button>
    </div>
  );
} 