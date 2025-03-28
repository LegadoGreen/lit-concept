import React from 'react';
import { ImpactMetricProps } from '../../types';

const ImpactMetric: React.FC<ImpactMetricProps> = ({ value, label }) => {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex-1 text-center border border-white/15 shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:bg-white/15">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
};

export default ImpactMetric;
