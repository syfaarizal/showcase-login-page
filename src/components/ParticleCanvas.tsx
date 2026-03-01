import { useRef } from 'react';
import { useParticles } from '../hooks/useParticles';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  return <canvas id="particleCanvas" ref={canvasRef} />;
}
