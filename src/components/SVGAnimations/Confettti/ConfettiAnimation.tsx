import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  duration?: number; // Duration before fade-out (default: 5000ms)
  fadeDuration?: number; // Time for fade-out effect (default: 1000ms)
}

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedX: number;
  speedY: number;
}

const ConfettiAnimation: React.FC<ConfettiProps> = ({
  duration = 5000,
  fadeDuration = 1000
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiPieces = useRef<ConfettiPiece[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const fadeStartTime = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const confettiCount = 150;

    const getCSSVariableValue = (variableName: string): string => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
    };

    const colors = [
      getCSSVariableValue('--color-red'),
      getCSSVariableValue('--color-blue'),
      getCSSVariableValue('--color-yellow'),
      getCSSVariableValue('--color-green'),
      getCSSVariableValue('--color-purple'),
      getCSSVariableValue('--color-light'),
      getCSSVariableValue('--color-dark'),
      getCSSVariableValue('--color-orange')
    ];
    let isFading = false;

    // Initialize confetti pieces
    confettiPieces.current = Array.from({ length: confettiCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      speedX: Math.random() * 5 - 1,
      speedY: Math.random() * 6 + 2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let opacity = 1;
      if (isFading && fadeStartTime.current !== null) {
        const elapsedFadeTime = Date.now() - fadeStartTime.current;
        opacity = Math.max(0, 1 - elapsedFadeTime / fadeDuration);
      }

      ctx.globalAlpha = opacity;

      confettiPieces.current.forEach((piece) => {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.rotation += 5;

        if (piece.y > height) {
          piece.y = -10;
          piece.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
      });

      if (!isFading || opacity > 0) {
        animationFrameId.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    draw();

    timeoutId.current = setTimeout(() => {
      isFading = true;
      fadeStartTime.current = Date.now();
    }, duration);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      ctx.clearRect(0, 0, width, height);
    };
  }, [duration, fadeDuration]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
    />
  );
};

export default ConfettiAnimation;
