import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
        </div>
      </div>
      {text && <p className="text-sm font-medium text-slate-400 tracking-wide">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
