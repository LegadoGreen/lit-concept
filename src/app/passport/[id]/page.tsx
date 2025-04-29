"use client";
import React from 'react';
import { Card } from '../../components';
import { ParticleBackground } from '../../components/Effects';

interface PassportPageProps {
  params: {
    id: string;
  };
}

const PassportPage = async ({ params }: PassportPageProps) => {
  // This could be loaded from an API in the future
  const cardData = {
    serialNumber: params.id,
    metrics: [
      { value: 150, label: 'CO₂ Saved (tonnes)' },
      { value: 20, label: 'Deforestation Prevented (km²)' }
    ],
    conditions: [
      { value: '420.5 ppm', label: 'CO₂ Concentration' },
      { value: '+1.24°C', label: 'Temperature Anomaly' },
      { value: '1895 ppb', label: 'CH₄ Concentration' },
      { value: '3.9 M km²', label: 'Arctic Sea Ice' },
      { value: 'Net Mass Loss', label: 'Ice Sheets Status' },
      { value: '+95 mm', label: 'Sea Level Rise' }
    ],
    achievements: [
      {
        title: 'Legado Early - Guania Colombia',
        region: 'Amazon Rainforest, Colombia',
        metrics: [
          { value: '4t CO₂', label: 'Carbon' },
          { value: '5km² Protected', label: 'Area' }
        ]
      },
      {
        title: 'Legado Early - Africa',
        region: 'Africa',
        metrics: [
          { value: '1t CO₂', label: 'Carbon' },
          { value: '1km² Protected', label: 'Area' }
        ]
      }
    ],
    mintDate: 'Mar 20, 2025'
  };

  return (
    <div className="app-wrapper">
      <ParticleBackground />
      <div className="container">
        <Card
          serialNumber={cardData.serialNumber}
          metrics={cardData.metrics}
          conditions={cardData.conditions}
          achievements={cardData.achievements}
          mintDate={cardData.mintDate}
        />
      </div>
    </div>
  );
};

export default PassportPage;