import React from 'react';
import { AchievementProps, ConditionProps } from '../../types';

interface CardBackProps {
  conditions: ConditionProps[];
  achievements: AchievementProps[];
  mintDate?: string;
}

const CardBack: React.FC<CardBackProps> = ({
  conditions,
  achievements,
  mintDate = "Mar 20, 2025"
}) => {
  return (
    <div className="card-back">
      <div className="back-header">
        <div className="back-title">Global Conditions & Projects</div>
        <div className="timestamp">Minted: {mintDate}</div>
      </div>

      {/* World Conditions */}
      <div className="world-conditions">
        {conditions.map((condition, index) => (
          <div key={index} className="condition">
            <div className="condition-value">{condition.value}</div>
            <div className="condition-label">{condition.label}</div>
          </div>
        ))}
      </div>

      {/* Project Achievements */}
      <div className="achievements">
        {achievements.map((achievement, index) => (
          <div key={index} className={`achievement ${index === 1 ? 'achievement-alt' : ''}`}>
            <div className="achievement-title">{achievement.title}</div>
            <div className="achievement-region">{achievement.region}</div>
            <div className="achievement-metrics">
              {achievement.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="achievement-metric">
                  {metric.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="back-footer">
        Data sources: NASA GISS, NOAA Climate Data
      </div>
    </div>
  );
};

export default CardBack;
