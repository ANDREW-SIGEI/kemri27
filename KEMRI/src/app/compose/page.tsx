'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { PaperclipIcon, Send } from 'lucide-react';

export default function ComposePage() {
  const [formData, setFormData] = useState({
    title: '',
    recipients: '',
    subject: '',
    content: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto">
      <div 
        className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(10px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h1 
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary-600 transform transition-all duration-300"
          style={{ 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            transform: 'translateZ(20px)'
          }}
        >
          Compose New Document
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div 
            className="transform transition-all duration-300 hover:scale-[1.01]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)'
              }}
              required
            />
          </div>
          
          <div 
            className="transform transition-all duration-300 hover:scale-[1.01]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
            <input
              type="text"
              name="recipients"
              value={formData.recipients}
              onChange={handleChange}
              placeholder="Enter recipient emails (separated by commas)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)'
              }}
              required
            />
          </div>
          
          <div 
            className="transform transition-all duration-300 hover:scale-[1.01]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)'
              }}
              required
            />
          </div>
          
          <div 
            className="transform transition-all duration-300 hover:scale-[1.01]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your message"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)'
              }}
              required
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300 text-sm"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(5px)'
              }}
            >
              <PaperclipIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Attach Files
            </button>
            
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(10px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Send Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 