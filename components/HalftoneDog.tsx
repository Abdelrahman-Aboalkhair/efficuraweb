"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

/**
 * Halftone labrador: samples `/brand/labrador-logo.svg` to an offscreen canvas
 * and renders each dark pixel as an animated SVG <circle>.
 *
 * Pointer interaction pushes dots within the influence radius away from the
 * cursor. On first mount the dots drift in from the left, or fade in place
 * when `fadeInPlace` is set, or appear instantly when `animateIn` is false.
 *
 * Ported from the pre-revamp site's hero (main branch, halftone-dog.tsx).
 */

interface Dot {
  x: number;
  y: number;
  r: number;
}

interface DotState {
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  opacity: number;
}

function rand(i: number): number {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

interface HalftoneDogProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  step?: number;
  maxRadius?: number;
  src?: string;
  /** Radius (in svg units) within which the cursor pushes dots away. */
  influenceRadius?: number;
  /** Max push distance in svg units at the cursor centre. */
  pushStrength?: number;
  /**
   * When true, dots fade in in place instead of drifting in from the
   * left edge. Useful for decorative overlays where the fly-in reads
   * as a distracting sweep.
   */
  fadeInPlace?: boolean;
  /**
   * When false, skip the intro animation entirely: dots render at full
   * opacity in their final positions on first paint. Pointer interaction
   * still works. Overrides `fadeInPlace` (there's nothing left to fade).
   */
  animateIn?: boolean;
  /**
   * SVG alignment within the box. The main-hero usage sits the dog on
   * the text baseline (`xMidYMax`); standalone placements usually want
   * it centered (`xMidYMid`).
   */
  preserveAspectRatio?: string;
}

export function HalftoneDog({
  className,
  color = "currentColor",
  width = 840,
  height = 1000,
  step = 13,
  maxRadius = 8.5,
  src = "/brand/labrador-logo.svg",
  influenceRadius = 110,
  pushStrength = 45,
  fadeInPlace = false,
  animateIn = true,
  preserveAspectRatio = "xMidYMax meet",
}: HalftoneDogProps) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [bbox, setBbox] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 0,
    y: 0,
    w: width,
    h: height,
  });
  const cancelled = useRef(false);
  const assemblingRef = useRef(true);

  // ── Sample the image into dots ───────────────────────────────────
  useEffect(() => {
    cancelled.current = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (cancelled.current) return;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
      const ar = img.width / img.height;
      const targetAr = width / height;
      let dw = width;
      let dh = height;
      if (ar > targetAr) {
        dh = width / ar;
      } else {
        dw = height * ar;
      }
      const dx0 = (width - dw) / 2;
      const dy0 = (height - dh) / 2;
      ctx.drawImage(img, dx0, dy0, dw, dh);

      const data = ctx.getImageData(0, 0, width, height).data;

      const darknessAt = (x: number, y: number): number => {
        const ix = Math.max(0, Math.min(width - 1, Math.round(x)));
        const iy = Math.max(0, Math.min(height - 1, Math.round(y)));
        let sum = 0;
        let n = 0;
        const rad = Math.max(1, Math.floor(step / 2));
        for (let oy = -rad; oy <= rad; oy++) {
          for (let ox = -rad; ox <= rad; ox++) {
            const xx = ix + ox;
            const yy = iy + oy;
            if (xx < 0 || xx >= width || yy < 0 || yy >= height) continue;
            const k = (yy * width + xx) * 4;
            const rC = data[k]!;
            const gC = data[k + 1]!;
            const bC = data[k + 2]!;
            const aC = data[k + 3]! / 255;
            const rr = rC * aC + 255 * (1 - aC);
            const gg = gC * aC + 255 * (1 - aC);
            const bb = bC * aC + 255 * (1 - aC);
            const lum = (0.299 * rr + 0.587 * gg + 0.114 * bb) / 255;
            sum += 1 - lum;
            n++;
          }
        }
        return n === 0 ? 0 : sum / n;
      };

      const next: Dot[] = [];
      const minR = 0.25;
      let bxMin = Infinity;
      let byMin = Infinity;
      let bxMax = -Infinity;
      let byMax = -Infinity;

      for (let gy = step / 2; gy < height; gy += step) {
        for (let gx = step / 2; gx < width; gx += step) {
          const darkness = darknessAt(gx, gy);
          if (darkness < 0.06) continue;
          const t = Math.min(1, Math.pow(darkness, 0.7));
          const r = minR + t * (maxRadius - minR);
          next.push({
            x: gx,
            y: gy,
            r,
          });
          if (gx - r < bxMin) bxMin = gx - r;
          if (gy - r < byMin) byMin = gy - r;
          if (gx + r > bxMax) bxMax = gx + r;
          if (gy + r > byMax) byMax = gy + r;
        }
      }

      if (next.length > 0) {
        // Pad slightly so the largest dots aren't clipped at the edge.
        const pad = maxRadius * 0.5;
        setBbox({
          x: Math.max(0, bxMin - pad),
          y: Math.max(0, byMin - pad),
          w: Math.min(width, bxMax + pad) - Math.max(0, bxMin - pad),
          h: Math.min(height, byMax + pad) - Math.max(0, byMin - pad),
        });
      }
      setDots(next);
    };

    return () => {
      cancelled.current = true;
    };
  }, [src, width, height, step, maxRadius]);

  // ── Pointer-driven displacement (RAF loop) ───────────────────────
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const statesRef = useRef<DotState[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useLayoutEffect(() => {
    if (dots.length === 0) {
      statesRef.current = [];
      groupRefs.current.length = 0;
      assemblingRef.current = false;
      return;
    }

    const baseShift = width * 2.0;
    statesRef.current = dots.map((_d, i) => {
      const extra = rand(i + 9) * width * 1.0;
      const dx = fadeInPlace ? 0 : -(baseShift + extra);
      const dy = fadeInPlace ? 0 : (rand(i + 17) - 0.5) * height * 0.25;

      return {
        dx: animateIn ? dx : 0,
        dy: animateIn ? dy : 0,
        tx: 0,
        ty: 0,
        opacity: animateIn ? 0 : 1,
      };
    });
    assemblingRef.current = animateIn;
    groupRefs.current.length = dots.length;

    // No intro: paint every dot at rest, full opacity - the RAF loop below
    // still runs for pointer interaction, but never touches opacity again.
    if (!animateIn) {
      for (let i = 0; i < dots.length; i++) {
        const g = groupRefs.current[i];
        if (g) g.setAttribute("opacity", "1");
      }
    }

    let raf = 0;
    const infR2 = influenceRadius * influenceRadius;
    let lastTs = performance.now();

    const tick = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      const states = statesRef.current;
      const p = pointerRef.current;

      if (assemblingRef.current) {
        let maxDist = 0;
        const k = 0.035;
        for (let i = 0; i < dots.length; i++) {
          const st = states[i]!;
          const d = dots[i]!;

          let px = 0;
          let py = 0;
          if (p.active) {
            const curX = d.x + st.dx;
            const curY = d.y + st.dy;
            const ddx = curX - p.x;
            const ddy = curY - p.y;
            const dist2 = ddx * ddx + ddy * ddy;
            if (dist2 < infR2) {
              const dist = Math.sqrt(dist2) || 0.001;
              const falloff = 1 - dist / influenceRadius;
              const mag = pushStrength * falloff * falloff;
              px = (ddx / dist) * mag;
              py = (ddy / dist) * mag;
            }
          }

          st.dx += (px - st.dx) * k;
          st.dy += (py - st.dy) * k;
          st.opacity = Math.min(1, st.opacity + dt / 1.8);
          const dist = Math.abs(st.dx - px) + Math.abs(st.dy - py);
          if (dist > maxDist) maxDist = dist;
          const g = groupRefs.current[i];
          if (g) {
            g.setAttribute(
              "transform",
              `translate(${(d.x + st.dx).toFixed(2)} ${(d.y + st.dy).toFixed(2)})`,
            );
            g.setAttribute("opacity", st.opacity.toFixed(3));
          }
        }
        if (maxDist < 0.5 && !p.active) {
          let minOpacity = 1;
          for (let i = 0; i < dots.length; i++) {
            const o = states[i]!.opacity;
            if (o < minOpacity) minOpacity = o;
          }
          if (minOpacity >= 0.999) {
            assemblingRef.current = false;
            for (let i = 0; i < dots.length; i++) {
              const st = states[i]!;
              st.dx = 0;
              st.dy = 0;
              st.opacity = 1;
              const g = groupRefs.current[i];
              if (g) g.setAttribute("opacity", "1");
            }
          }
        } else if (maxDist < 0.5) {
          assemblingRef.current = false;
          for (let i = 0; i < dots.length; i++) {
            const st = states[i]!;
            st.opacity = 1;
            const g = groupRefs.current[i];
            if (g) g.setAttribute("opacity", "1");
          }
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      for (let i = 0; i < dots.length; i++) {
        const st = states[i]!;
        const d = dots[i]!;

        if (p.active) {
          const ddx = d.x - p.x;
          const ddy = d.y - p.y;
          const dist2 = ddx * ddx + ddy * ddy;
          if (dist2 < infR2) {
            const dist = Math.sqrt(dist2) || 0.001;
            const falloff = 1 - dist / influenceRadius;
            const mag = pushStrength * falloff * falloff;
            st.tx = (ddx / dist) * mag;
            st.ty = (ddy / dist) * mag;
          } else {
            st.tx = 0;
            st.ty = 0;
          }
        } else {
          st.tx = 0;
          st.ty = 0;
        }

        const returning = st.tx === 0 && st.ty === 0;
        const k = returning ? 0.04 : 0.22;
        st.dx += (st.tx - st.dx) * k;
        st.dy += (st.ty - st.dy) * k;

        const g = groupRefs.current[i];
        if (g) {
          g.setAttribute(
            "transform",
            `translate(${(d.x + st.dx).toFixed(2)} ${(d.y + st.dy).toFixed(2)})`,
          );
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dots, fadeInPlace, animateIn, height, influenceRadius, pushStrength, width]);

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const local = pt.matrixTransform(ctm.inverse());
    pointerRef.current = {
      x: local.x,
      y: local.y,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div className={className ?? ""} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox={`${bbox.x} ${bbox.y} ${bbox.w} ${bbox.h}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-full overflow-visible"
        role="img"
        preserveAspectRatio={preserveAspectRatio}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <g fill={color} pointerEvents="none">
          {dots.map((d, i) => (
            <g
              key={i}
              ref={(el) => {
                groupRefs.current[i] = el;
              }}
              transform={`translate(${d.x} ${d.y})`}
            >
              <circle cx={0} cy={0} r={d.r} />
            </g>
          ))}
        </g>
        <rect
          x={bbox.x}
          y={bbox.y}
          width={bbox.w}
          height={bbox.h}
          fill="transparent"
          pointerEvents="all"
        />
      </svg>
    </div>
  );
}
