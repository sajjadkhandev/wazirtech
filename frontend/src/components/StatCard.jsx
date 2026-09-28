import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, trend = 'up', color = 'brand' }) => {
  const colorStyles = {
    brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }[color] || 'bg-brand-500/10 text-brand-400 border-brand-500/20';

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between transition-all hover:border-slate-700">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h4 className="text-3xl font-extrabold text-white tracking-tight">{value}</h4>
        {change && (
          <p className={`text-xs mt-2 font-medium flex items-center gap-1 ${trend === 'up' ? 'text-emerald-400' : 'text-slate-400'}`}>
            <span>{trend === 'up' ? '↑' : '•'}</span> {change}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 ${colorStyles}`}>
          <Icon className="w-7 h-7" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
