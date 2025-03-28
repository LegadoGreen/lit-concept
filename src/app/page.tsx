"use client";
import React from 'react';
import Head from 'next/head';
import { Card } from './components';
import { ParticleBackground } from './components/Effects';

const Home: React.FC = () => {
  // This could be loaded from an API in the future
  const cardData = {
    serialNumber: '200000',
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
      <Head>
        <title>Environmental Impact Card NFT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div>

      </div>
      {/* ParticleBackground needs to be first in the DOM but visually behind */}
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

export default Home;
