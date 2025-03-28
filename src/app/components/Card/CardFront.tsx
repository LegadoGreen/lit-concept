import React from 'react';
import { ImpactMetricProps } from '../../types';

interface CardFrontProps {
  serialNumber: string;
  metrics: ImpactMetricProps[];
  tiltEffectRef: React.RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
}

const CardFront: React.FC<CardFrontProps> = ({
  serialNumber,
  metrics,
  tiltEffectRef,
  isFlipped
}) => {
  return (
    <div
      id="card-front"
      className="card-front"
      style={{ display: isFlipped ? 'none' : 'flex' }}
    >
      {/* Holographic Foil Effect */}
      <div className="holographic-foil"></div>

      {/* Data Stream Animation */}
      <div className="data-stream"></div>

      {/* NFT Badge */}
      <div className="nft-badge">NFT</div>

      {/* Card Header */}
      <div className="card-header">
        <div>
          <div className="card-title">Environmental Passport</div>
          <div className="card-subtitle">Digital Impact Certificate</div>
        </div>
        <div className="card-logo">🌍</div>
      </div>

      {/* Card Body - Impact Metrics */}
      <div className="card-body">
        {metrics.map((metric, index) => (
          <div key={index} className="impact-metric">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        <div className="serial-number">#{serialNumber}</div>
        <div className="flip-hint">
          <span className="flip-icon">↺</span>
          <span>Flip for details</span>
        </div>
      </div>

      {/* Live Carbon Data Indicator */}
      <div className="carbon-indicator">
        <span className="carbon-dot"></span>
        <span>Live Data</span>
      </div>

      {/* 3D Tilt Effect Layer */}
      <div ref={tiltEffectRef} className="tilt-effect"></div>
    </div>
  );
};

export default CardFront;
