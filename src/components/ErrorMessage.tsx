import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div className="flex justify-center mb-3">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};