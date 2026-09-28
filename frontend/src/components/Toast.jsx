import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Toast = () => {
  const { notification, closeNotification } = useAuth();

  if (!notification) return null;

  const { type, message } = notification;

  const bgStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
    info: 'bg-sky-950/90 border-sky-500/50 text-sky-200'
  }[type] || 'bg-slate-900 border-slate-700 text-slate-200';

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-full animate-bounce-in shadow-2xl transition-all">
      <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${bgStyles}`}>
        {icons[type] || icons.info}
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {message}
        </div>
        <button
          onClick={closeNotification}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
