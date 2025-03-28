import { useEffect, useRef } from 'react';

interface UseTiltEffectOptions {
  maxTilt?: number;
  isFlipped: boolean;
}

const useTiltEffect = (
  cardRef: React.RefObject<HTMLDivElement>,
  tiltEffectRef: React.RefObject<HTMLDivElement>,
  { maxTilt = 5, isFlipped }: UseTiltEffectOptions
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const tiltEffect = tiltEffectRef.current;
    const container = card?.parentElement;

    if (!card || !tiltEffect || !container) return;

    containerRef.current = container as HTMLDivElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (isFlipped) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Calculate rotation (max degrees defined by maxTilt)
      const rotateY = ((xPercent - 50) / 50) * maxTilt;
      const rotateX = -((yPercent - 50) / 50) * maxTilt;

      // Apply transform
      card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

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

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cardRef, tiltEffectRef, isFlipped, maxTilt]);

  return containerRef;
};

export default useTiltEffect;
