'use client';

import { useEffect, useRef } from 'react';
import type { Capability } from '@/types/resume';

type CapabilityRadarProps = {
  capabilities: readonly Capability[];
};

export default function CapabilityRadar({ capabilities }: CapabilityRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rankedCapabilities = [...capabilities].sort((left, right) => right.score - left.score);
    const radarCapabilities = [
      rankedCapabilities[1],
      rankedCapabilities[2],
      rankedCapabilities[3],
      rankedCapabilities[4],
      rankedCapabilities[0],
    ];

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);

      const context = canvas.getContext('2d');
      if (!context) return;
      context.scale(scale, scale);
      context.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2 - 2;
      const radius = Math.min(rect.width, rect.height) * 0.37;
      const step = (Math.PI * 2) / radarCapabilities.length;
      const start = -Math.PI / 2;

      const point = (index: number, ratio: number) => ({
        x: centerX + Math.cos(start + index * step) * radius * ratio,
        y: centerY + Math.sin(start + index * step) * radius * ratio,
      });

      context.lineWidth = 1;
      for (let level = 1; level <= 5; level += 1) {
        context.beginPath();
        radarCapabilities.forEach((_, index) => {
          const current = point(index, level / 5);
          if (index === 0) context.moveTo(current.x, current.y);
          else context.lineTo(current.x, current.y);
        });
        context.closePath();
        context.strokeStyle = level === 5 ? '#111111' : 'rgba(17, 17, 17, 0.15)';
        context.stroke();
      }

      radarCapabilities.forEach((_, index) => {
        const outer = point(index, 1);
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(outer.x, outer.y);
        context.strokeStyle = 'rgba(17, 17, 17, 0.14)';
        context.stroke();
      });

      context.beginPath();
      radarCapabilities.forEach((capability, index) => {
        const current = point(index, capability.score / 5);
        if (index === 0) context.moveTo(current.x, current.y);
        else context.lineTo(current.x, current.y);
      });
      context.closePath();
      context.fillStyle = 'rgba(31, 78, 255, 0.18)';
      context.strokeStyle = '#1f4eff';
      context.lineWidth = 2;
      context.fill();
      context.stroke();

      radarCapabilities.forEach((capability, index) => {
        const current = point(index, capability.score / 5);
        const label = point(index, 1.1);
        context.beginPath();
        context.arc(current.x, current.y, 4, 0, Math.PI * 2);
        context.fillStyle = '#1f4eff';
        context.fill();

        context.fillStyle = '#111111';
        context.font = '650 14px Inter, system-ui, sans-serif';
        context.textAlign = label.x < centerX - 8 ? 'right' : label.x > centerX + 8 ? 'left' : 'center';
        context.textBaseline = label.y < centerY ? 'bottom' : 'top';
        context.fillText(capability.radarLabel, label.x, label.y);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [capabilities]);

  return (
    <div className="radar-visual">
      <canvas ref={canvasRef} aria-label="技术能力五维雷达图" role="img" />
    </div>
  );
}
