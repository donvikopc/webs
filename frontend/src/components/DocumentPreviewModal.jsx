import { X, Download, ExternalLink } from 'lucide-react';

const DocumentPreviewModal = ({ isOpen, onClose, documentUrl, title }) => {
  if (!isOpen) return null;

  // Google Docs Viewer URL (works for PDF, DOC, DOCX)
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(documentUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3 overflow-hidden">
            <h3 className="font-bold text-gray-800 truncate max-w-md" title={title}>
              {title || 'Document Preview'}
            </h3>
            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded uppercase">
              {documentUrl.split('.').pop()}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href={documentUrl} 
              download
              className="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-full transition-colors tooltip"
              title="Download Original"
            >
              <Download size={20} />
            </a>
            <a 
              href={documentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-full transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink size={20} />
            </a>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          <iframe
            src={viewerUrl}
            className="w-full h-full border-none"
            title="Document Viewer"
            allow="autoplay"
          >
            <p className="flex items-center justify-center h-full text-gray-500">
              Your browser does not support iframes. 
              <a href={documentUrl} className="text-primary ml-1 hover:underline">Download the file</a> to view it.
            </p>
          </iframe>
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-center text-xs text-gray-500 rounded-b-xl">
          Previewing document via Google Docs Viewer
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
