import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle settings
    const particleCount = 100;
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      opacity: number;
    }[] = [];

    // Colors
    const colors = ['#00C9A7', '#5045E5', '#FFC75F'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        },
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Animation function
    function animate() {
      requestAnimationFrame(animate);

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        // Reset if out of bounds
        if (p.x < 0 || p.x > canvas.width) p.velocity.x = -p.velocity.x;
        if (p.y < 0 || p.y > canvas.height) p.velocity.y = -p.velocity.y;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
    }

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} className="fixed particle-background top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleBackground;
