import React, { useRef, useState, useEffect } from 'react';
import { CardProps } from '../../types';
import CardFront from './CardFront';
import CardBack from './CardBack';

const Card: React.FC<CardProps> = ({
  serialNumber,
  metrics,
  conditions,
  achievements,
  mintDate
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltEffectRef = useRef<HTMLDivElement>(null);
  const cardSceneRef = useRef<HTMLDivElement>(null);

  // Handle card click for flipping
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 3D tilt effect based on mouse position
  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      // Reset any active transforms on resize to prevent visual glitches
      if (cardRef.current) {
        if (isFlipped) {
          cardRef.current.style.transform = 'rotateY(180deg)';
        } else {
          cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFlipped]);

  useEffect(() => {
    const cardScene = cardSceneRef.current;
    const card = cardRef.current;
    const tiltEffect = tiltEffectRef.current;

    if (!cardScene || !card || !tiltEffect) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isFlipped) return;

      const rect = cardScene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Calculate rotation (max 5 degrees)
      const rotateY = ((xPercent - 50) / 50) * 5;
      const rotateX = -((yPercent - 50) / 50) * 5;

      // Apply transform if card is not flipped
      if (!isFlipped) {
        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }

      // Update highlight effect
      tiltEffect.style.opacity = '0.4';
      tiltEffect.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
    };

    const handleMouseLeave = () => {
      if (isFlipped) {
        card.style.transform = 'rotateY(180deg)';
      } else {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        tiltEffect.style.opacity = '0';
      }
    };

    cardScene.addEventListener('mousemove', handleMouseMove);
    cardScene.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardScene.removeEventListener('mousemove', handleMouseMove);
      cardScene.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFlipped]);

  return (
    <div ref={cardSceneRef} className="card-scene">
      <div
        ref={cardRef}
        className={`card ${isFlipped ? 'is-flipped' : ''}`}
        onClick={handleCardClick}
        onTouchStart={() => {}} /* Empty handler to improve touch response */
      >
        <CardFront
          serialNumber={serialNumber}
          metrics={metrics}
          tiltEffectRef={tiltEffectRef}
          isFlipped={isFlipped}
        />

        <CardBack
          conditions={conditions}
          achievements={achievements}
          mintDate={mintDate}
        />
      </div>
    </div>
  );
};

export default Card;
