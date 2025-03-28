import React from 'react';

const HolographicFoil: React.FC = () => {
  return (
    <div className="holographic-foil absolute top-0 left-0 w-full h-full opacity-30 transition-all duration-500 translate-z-1 pointer-events-none z-10" />
  );
};

export default HolographicFoil;
