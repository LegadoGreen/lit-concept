import React from 'react';
import { ConditionProps } from '../../types';

const Condition: React.FC<ConditionProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </div>
      <div className="text-xs text-white/60 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
    </div>
  );
};

export default Condition;
