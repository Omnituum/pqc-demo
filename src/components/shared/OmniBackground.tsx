import { useEffect, useRef, useState } from 'react';

/**
 * OmniBackground - Shared visual foundation for Omnituum pages
 *
 * Variants:
 * - marketing: Deeper gradients, hexagonal lattice, security pulses (architectural)
 * - demo: Darker, flatter, minimal motion (controlled lab environment)
 */

interface OmniBackgroundProps {
  variant?: 'marketing' | 'demo';
}

// Shared color tokens
const COLORS = {
  background: {
    start: '#050507',
    mid: '#08080d',
    end: '#050507',
  },
  node: { r: 109, g: 40, b: 217 }, // Deep violet
  pulseStart: { r: 79, g: 70, b: 229 }, // Indigo
  pulseEnd: { r: 13, g: 148, b: 136 }, // Muted teal
  // Demo variant - muted versions
  demoNode: { r: 139, g: 92, b: 246 }, // pqc-500
  demoAccent: { r: 6, g: 182, b: 212 }, // classical-500
};

// Shared timing tokens
const TIMING = {
  marketing: {
    pulseInterval: 12000,
    pulseDuration: 3500,
    driftCycle: 200000,
    driftAmplitudeX: 10,
    driftAmplitudeY: 15,
  },
  demo: {
    pulseInterval: 0, // No pulses
    pulseDuration: 0,
    driftCycle: 300000, // Slower drift
    driftAmplitudeX: 5,
    driftAmplitudeY: 8,
  },
};

interface HexNode {
  x: number;
  y: number;
  col: number;
  row: number;
  neighbors: number[];
}

interface SecurityPulse {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export function OmniBackground({ variant = 'marketing' }: OmniBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timing = TIMING[variant];
  const isDemo = variant === 'demo';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodeColor = isDemo ? COLORS.demoNode : COLORS.node;
    const pulseColorStart = COLORS.pulseStart;
    const pulseColorEnd = COLORS.pulseEnd;

    // Build deterministic hexagonal grid
    const hexRadius = isDemo ? 80 : 70; // Larger spacing for demo (less dense)
    const hexHeight = hexRadius * Math.sqrt(3);
    const nodes: HexNode[] = [];
    const nodeMap: Map<string, number> = new Map();

    const cols = Math.ceil(width / (hexRadius * 1.5)) + 4;
    const rows = Math.ceil(height / hexHeight) + 4;
    const offsetX = -hexRadius * 2;
    const offsetY = -hexHeight;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * hexRadius * 1.5;
        const y = offsetY + row * hexHeight + (col % 2) * (hexHeight / 2);
        const key = `${col},${row}`;
        nodeMap.set(key, nodes.length);
        nodes.push({ x, y, col, row, neighbors: [] });
      }
    }

    // Build neighbor connections
    nodes.forEach((node, idx) => {
      const { col, row } = node;
      const neighborOffsets = col % 2 === 0
        ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
        : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

      neighborOffsets.forEach(([dc, dr]) => {
        const neighborKey = `${col + dc},${row + dr}`;
        const neighborIdx = nodeMap.get(neighborKey);
        if (neighborIdx !== undefined && neighborIdx > idx) {
          node.neighbors.push(neighborIdx);
        }
      });
    });

    // Security pulse state (marketing only)
    let activePulse: SecurityPulse | null = null;
    let lastPulseTime = 0;

    const triggerPulse = (time: number) => {
      if (isDemo) return; // No pulses in demo variant

      const eligibleNodes = nodes.filter(n =>
        n.x > width * 0.2 && n.x < width * 0.8 &&
        n.y > height * 0.3 && n.y < height * 0.7
      );

      if (eligibleNodes.length === 0) return;

      const selectedIdx = Math.floor((time / 1000) % eligibleNodes.length);
      const node = eligibleNodes[selectedIdx];

      activePulse = {
        x: node.x,
        y: node.y,
        startTime: time,
        duration: timing.pulseDuration,
      };
      lastPulseTime = time;
    };

    let startTime = performance.now();

    const draw = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Background gradient - darker for demo
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isDemo) {
        gradient.addColorStop(0, '#050810');
        gradient.addColorStop(0.5, '#080c14');
        gradient.addColorStop(1, '#050810');
      } else {
        gradient.addColorStop(0, COLORS.background.start);
        gradient.addColorStop(0.5, COLORS.background.mid);
        gradient.addColorStop(1, COLORS.background.end);
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate time drift
      let driftX = 0;
      let driftY = 0;
      if (!prefersReducedMotion) {
        const driftProgress = (elapsed % timing.driftCycle) / timing.driftCycle;
        const driftAngle = driftProgress * Math.PI * 2;
        driftX = Math.sin(driftAngle) * timing.driftAmplitudeX;
        driftY = Math.cos(driftAngle * 0.7) * timing.driftAmplitudeY;
      }

      ctx.save();
      ctx.translate(driftX, driftY);

      // Draw connection lines - more subtle for demo
      const lineOpacity = isDemo ? 0.03 : 0.05;
      ctx.strokeStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${lineOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      nodes.forEach((node) => {
        node.neighbors.forEach((neighborIdx) => {
          const neighbor = nodes[neighborIdx];
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(neighbor.x, neighbor.y);
        });
      });
      ctx.stroke();

      // Draw nodes
      const baseOpacity = isDemo ? 0.08 : 0.12;
      const baseRadius = isDemo ? 1.2 : 1.5;

      nodes.forEach((node) => {
        let opacity = baseOpacity;
        let glowRadius = 0;

        if (activePulse && !prefersReducedMotion && !isDemo) {
          const pulseElapsed = currentTime - activePulse.startTime;
          if (pulseElapsed < activePulse.duration) {
            const pulseProgress = pulseElapsed / activePulse.duration;
            const pulseRadius = pulseProgress * 220;
            const dist = Math.hypot(node.x - activePulse.x, node.y - activePulse.y);

            if (dist < pulseRadius && dist > pulseRadius - 45) {
              const intensity = 1 - Math.abs(dist - (pulseRadius - 22)) / 22;
              const fade = 1 - pulseProgress;
              opacity = baseOpacity + intensity * fade * 0.5;
              glowRadius = intensity * fade * 8;
            }
          }
        }

        if (glowRadius > 0 && !isDemo) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          const pulseProgress = activePulse ? (currentTime - activePulse.startTime) / activePulse.duration : 0;
          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${opacity})`;
        ctx.fill();
      });

      // Draw security pulse ring (marketing only)
      if (activePulse && !prefersReducedMotion && !isDemo) {
        const pulseElapsed = currentTime - activePulse.startTime;
        if (pulseElapsed < activePulse.duration) {
          const pulseProgress = pulseElapsed / activePulse.duration;
          const easeProgress = 1 - Math.pow(1 - pulseProgress, 2);
          const pulseRadius = easeProgress * 220;
          const fade = 1 - pulseProgress;

          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);

          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fade * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Subtle origin glow
          const originGlow = ctx.createRadialGradient(
            activePulse.x, activePulse.y, 0,
            activePulse.x, activePulse.y, 25
          );
          originGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fade * 0.35})`);
          originGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = originGlow;
          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, 25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          activePulse = null;
        }
      }

      ctx.restore();

      // Trigger new pulse (marketing only)
      if (!prefersReducedMotion && !isDemo && timing.pulseInterval > 0 && currentTime - lastPulseTime > timing.pulseInterval && !activePulse) {
        triggerPulse(currentTime);
      }

      // Vignette - stronger for demo (more controlled feel)
      const vignetteStrength = isDemo ? 0.5 : 0.4;
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.25,
        width / 2, height / 2, height * 0.85
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, `rgba(0, 0, 0, ${vignetteStrength})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(draw);
    };

    // Initial pulse (marketing only)
    if (!isDemo) {
      setTimeout(() => triggerPulse(performance.now()), 3000);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [prefersReducedMotion, variant, isDemo, timing]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: isDemo ? '#050810' : '#050507' }}
      aria-hidden="true"
    />
  );
}
