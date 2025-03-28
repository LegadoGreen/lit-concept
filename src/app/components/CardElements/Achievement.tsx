import React from 'react';
import { AchievementProps } from '../../types';

const Achievement: React.FC<AchievementProps> = ({ title, region, metrics }) => {
  return (
    <div className="bg-gradient-to-r from-secondary/20 to-gradient-end/20 rounded-lg p-2.5 mb-2 border-l-3 border-secondary shadow-md">
      <div className="text-sm font-semibold text-white mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
      <div className="text-xs text-white/70 mb-1.5">
        {region}
      </div>
      <div className="flex gap-2 mt-1 flex-wrap">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-black/20 px-1.5 py-0.5 rounded text-xs text-white/90 whitespace-nowrap">
            {metric.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
