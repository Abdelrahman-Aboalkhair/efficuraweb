"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

/**
 * Draggable 3D pen for the hero.
 *
 * Interaction model: click-and-hold the pen to "pick it up" (it lifts straight
 * up to a raised height), drag across an invisible ground plane, and release to
 * drop it - it falls back under gravity and settles where you let go. The
 * contact shadow stays pinned to the ground, so the gap between pen and shadow
 * sells the lift.
 *
 * The pen geometry is procedural (see <PenModel/>) with PBR materials - a
 * glossy brand-violet lacquer barrel and gold fittings - lit by an image-based
 * studio environment for realistic reflections. To swap in a real model, drop a
 * .glb in /public and replace <PenModel/> with a `useGLTF('/pen.glb')` primitive
 * (the drag/lift rig around it stays exactly the same).
 */

const REST_Y = 0; // pen lying flat on the "desk"
const LIFT_Y = 1.2; // picked-up height (reads as the pen growing toward the camera)
const BOUNDS = { x: 3.4, z: 1.9 }; // keep the pen inside the frame while dragging
const START: [number, number, number] = [1.7, REST_Y, -0.3]; // resting spot, upper-right (−z is up-screen)
const SCALE = 0.66; // ~two-thirds size
const YAW = 0.78; // facing: nib toward top-right, cap toward bottom-left
const BRAND_VIOLET = "#bf6c35";

// Intro: the pen rolls in from off-screen bottom-right to its resting spot,
// spinning about its length and unwinding to the wordmark back on top.
const INTRO_START: [number, number, number] = [4.6, REST_Y, 3.3]; // off-screen bottom-right (+x right, +z down)
const INTRO_DURATION = 2.8; // seconds for the roll-in (slow, unhurried entrance)

// A few deliberate, weighty rolls as the pen travels in - enough that it grips
// and rolls rather than looking like it slides, but not a frantic spin. The spin
// is locked to the same eased progress as the glide (see useFrame), so it
// decelerates together with the travel and settles with weight. Whole turns ⇒
// the wordmark lands back on top.
const INTRO_ROLLS = 4;
const INTRO_TURNS = INTRO_ROLLS * 2 * Math.PI;

// Settle physics for when a lifted pen is released (world units, seconds).
const GRAVITY = -26;
const RESTITUTION = 0.04; // all but no bounce on landing
const REST_VEL = 1.6; // below this impact speed it stops bouncing

// Grounded blob shadow. It tracks the pen's x/z and sits a hair down-and-right of
// it (as if the key light is up-and-left). At rest it hugs the pen - tight, dark
// and barely offset, so the pen reads as lying on the desk. As the pen lifts, the
// shadow stays on the desk but slides a touch further out, grows and softens, so
// the widening gap sells the pick-up.
const SHADOW_Y = -0.12; // just beneath the resting pen
// Offset down-right on screen (+x right, +z down). Tiny at rest so the shadow
// stays glued to the pen; a bit larger once lifted to open up a believable gap.
const SHADOW_OFFSET_X = { rest: 0.04, lift: 0.22 };
const SHADOW_OFFSET_Z = { rest: 0.05, lift: 0.3 };
const SHADOW_LEN = { rest: 1.7, lift: 2.3 }; // ellipse extent along the pen's length
const SHADOW_WID = { rest: 0.52, lift: 0.9 }; // and across it - a touch taller so it reads under the pen
const SHADOW_OPACITY = { rest: 0.42, lift: 0.28 }; // faint on the light desk; fainter still once spread

// Brand mark path, lifted from /public/efficura.svg (16×16 viewBox).
const LOGO_PATH =
  "M4.70801 1.09831L3.00684 2.79167C2.47732 3.31799 2.17873 4.03281 2.17871 4.77898C2.17874 5.52515 2.4773 6.23996 3.00684 6.76628C3.53625 7.29239 4.25318 7.58757 5 7.58757C5.74682 7.58757 6.46375 7.29239 6.99316 6.76628L7.87207 5.89128L7.87305 5.89226C8.30398 5.46448 8.88913 5.22331 9.5 5.22331C10.1109 5.22331 10.696 5.46448 11.127 5.89226V5.89128L15.0068 9.74773C15.2729 10.0122 15.4209 10.3707 15.4209 10.7428C15.4208 11.1148 15.2727 11.4726 15.0068 11.737C14.7406 12.0016 14.3783 12.151 14 12.151C13.6217 12.151 13.2594 12.0016 12.9932 11.737L10.4932 9.25261C10.219 8.98008 9.77644 8.98135 9.50391 9.25554C9.23144 9.52974 9.23267 9.97228 9.50684 10.2448L11.5068 12.2331L11.6006 12.3356C11.6887 12.4425 11.7602 12.5623 11.8135 12.6901C11.8845 12.8605 11.9209 13.043 11.9209 13.2272C11.9209 13.4115 11.8845 13.5948 11.8135 13.7653C11.7425 13.9355 11.6383 14.0906 11.5068 14.2214C11.3751 14.3523 11.2177 14.4569 11.0449 14.528C10.8723 14.599 10.6871 14.6354 10.5 14.6354C10.3129 14.6354 10.1277 14.599 9.95508 14.528C9.78235 14.4569 9.62494 14.3523 9.49316 14.2214L7.49316 12.2341C7.21901 11.9617 6.77643 11.963 6.50391 12.237C6.23144 12.5112 6.23266 12.9547 6.50684 13.2272L7.00488 13.7223L7.00684 13.7243C7.27264 13.9887 7.4209 14.3465 7.4209 14.7184C7.42081 15.0904 7.27273 15.4482 7.00684 15.7126C6.96132 15.7578 6.90324 15.7911 6.74805 15.8053C6.6633 15.8131 6.56442 15.8137 6.43457 15.8102C6.33739 15.8076 6.20635 15.8032 6.07715 15.8014C5.93099 15.7761 5.7889 15.745 5.65039 15.7106C4.62028 15.1839 3.71352 14.5652 2.98438 13.8229C1.76933 12.5859 1.00002 10.9731 1 8.75456V1.80339L1.21875 1.79948C2.37172 1.75878 3.61149 1.40016 4.78809 0.855148L4.79785 0.853195L4.70801 1.09831ZM8.58496 0.00749207C8.72554 -0.00972658 9.02741 0.0382907 9.55664 0.225266C10.0573 0.402185 10.6476 0.659395 11.3271 0.952805C12.3541 1.39621 13.5645 1.91245 14.7998 2.24675V7.56902L12.1133 4.89909V4.89812L11.9805 4.77312C11.3017 4.16281 10.4181 3.82292 9.5 3.82292C8.52093 3.82292 7.58078 4.2092 6.88672 4.89812V4.89909L6.00684 5.77312C5.74062 6.03769 5.3783 6.18718 5 6.18718C4.6217 6.18718 4.25938 6.03769 3.99316 5.77312C3.72731 5.50871 3.57913 5.15094 3.5791 4.77898C3.57912 4.40699 3.72729 4.04925 3.99316 3.78484L6.80273 0.992844C7.04771 0.749995 7.19709 0.593572 7.33984 0.457687C7.47312 0.330839 7.55499 0.2676 7.62598 0.225266C7.75847 0.146302 7.94019 0.0864702 8.58496 0.00749207Z";

// Texture for the barrel's lateral surface. Aspect = length / circumference so
// the wordmark isn't stretched: length 1.78 over circumference 2π·~0.132 ≈ 0.83
// ⇒ ~2.15.
const BARREL_TEX_W = 768;
const BARREL_TEX_H = 1655;

function drawBarrel(ctx: CanvasRenderingContext2D, family: string) {
  const { width: W, height: H } = ctx.canvas;

  // Base coat: the lacquer colour now rides in the texture, so the material's
  // own colour stays white and just multiplies through unchanged.
  ctx.fillStyle = BRAND_VIOLET;
  ctx.fillRect(0, 0, W, H);

  // White logo lockup (mark + wordmark) running lengthways, centred on the
  // barrel face that rests toward the camera. The cylinder's u wraps the
  // circumference and v runs the length; u = 0.75 is the upward-facing side at
  // rest (see CylinderGeometry torso UVs), so the logo sits on top.
  const ICON = 104;
  const GAP = 30;
  const FONT = 88;

  ctx.save();
  ctx.translate(W * 0.75, H * 0.5);
  ctx.rotate(-Math.PI / 2); // lay the horizontal lockup along the pen's length
  ctx.fillStyle = "#ffffff";

  ctx.font = `600 ${FONT}px ${family}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const text = "efficura";
  const textW = ctx.measureText(text).width;
  const startX = -(ICON + GAP + textW) / 2;

  ctx.save();
  ctx.translate(startX, -ICON / 2);
  ctx.scale(ICON / 16, ICON / 16);
  ctx.fill(new Path2D(LOGO_PATH));
  ctx.restore();

  ctx.fillText(text, startX + ICON + GAP, 0);
  ctx.restore();
}

function readFontFamily() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--font-helvetica-neue")
      .trim() || "system-ui, sans-serif"
  );
}

// Paints the barrel texture once, then repaints when the brand font finishes
// loading so the wordmark lands in Helvetica Neue rather than the fallback.
function useBarrelTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = BARREL_TEX_W;
    canvas.height = BARREL_TEX_H;
    drawBarrel(canvas.getContext("2d")!, readFontFamily());
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16; // clamped to the device max on upload - keeps the logo crisp at a grazing angle
    return tex;
  }, []);

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      const canvas = texture.image as HTMLCanvasElement;
      drawBarrel(canvas.getContext("2d")!, readFontFamily());
      texture.needsUpdate = true;
    });
    return () => {
      alive = false;
    };
  }, [texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

function PenModel() {
  const barrelTexture = useBarrelTexture();

  // Memoize materials so they aren't rebuilt on every render.
  const lacquer = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: BRAND_VIOLET,
        metalness: 0,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [],
  );
  // Same lacquer, but the colour comes from the logo texture (white base ×
  // violet/white map). Kept separate so the wordmark only lands on the barrel,
  // not the cap and finial that share `lacquer`.
  const barrelLacquer = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        map: barrelTexture,
        metalness: 0,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [barrelTexture],
  );
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9a24b",
        metalness: 1,
        roughness: 0.25,
      }),
    [],
  );
  const steel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd2d6",
        metalness: 1,
        roughness: 0.22,
      }),
    [],
  );

  // Built lying along +X, centred on the origin. The nib points toward +X.
  // cylinder/cone geometry runs along +Y by default, so each part is rotated
  // a quarter-turn about Z to lie horizontally.
  const lie = [0, 0, -Math.PI / 2] as const;

  return (
    <group>
      {/* Nib shoulder - gold, tapering smoothly from the grip toward the point.
          radiusBottom matches the grip's front radius so there's no ledge. */}
      <mesh material={gold} rotation={lie} position={[1.3, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.105, 0.3, 48]} />
      </mesh>
      {/* Cone point - the fine gold housing that carries the writing ball. Ends
          in a small flat (radiusTop) that the ball seats into, not a sharp apex. */}
      <mesh material={gold} rotation={lie} position={[1.49, 0, 0]}>
        <cylinderGeometry args={[0.014, 0.045, 0.08, 48]} />
      </mesh>
      {/* Writing ball - a tiny bead sunk into the housing so its lower half is
          hidden and only a hint protrudes, the way a real ballpoint reads (not
          the floating orb this used to be). */}
      <mesh material={steel} position={[1.525, 0, 0]}>
        <sphereGeometry args={[0.016, 32, 32]} />
      </mesh>
      {/* Grip section - gold, slightly tapered toward the nib */}
      <mesh material={gold} rotation={lie} position={[0.97, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.12, 0.36, 48]} />
      </mesh>
      {/* Main barrel - violet lacquer, branded with the white logo */}
      <mesh material={barrelLacquer} rotation={lie} position={[-0.1, 0, 0]}>
        <cylinderGeometry args={[0.128, 0.135, 1.78, 48]} />
      </mesh>
      {/* Centre band - gold ring where cap meets barrel */}
      <mesh material={gold} rotation={lie} position={[-1.01, 0, 0]}>
        <cylinderGeometry args={[0.142, 0.142, 0.1, 48]} />
      </mesh>
      {/* Cap - violet lacquer */}
      <mesh material={lacquer} rotation={lie} position={[-1.27, 0, 0]}>
        <cylinderGeometry args={[0.134, 0.138, 0.42, 48]} />
      </mesh>
      {/* Rounded cap finial */}
      <mesh material={lacquer} position={[-1.48, 0, 0]}>
        <sphereGeometry args={[0.134, 48, 32]} />
      </mesh>
      {/* Pocket clip - gold strip standing slightly off the cap */}
      <mesh material={gold} position={[-1.2, 0.158, 0]}>
        <boxGeometry args={[0.46, 0.022, 0.05]} />
      </mesh>
      <mesh material={gold} position={[-0.98, 0.14, 0]}>
        <sphereGeometry args={[0.032, 24, 24]} />
      </mesh>
    </group>
  );
}

// Soft radial blob for the pen's grounded shadow - a violet-black gradient that
// fades to transparent at the rim, painted once to a canvas texture.
function useShadowTexture() {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(36, 16, 50, 0.55)");
    grad.addColorStop(0.35, "rgba(36, 16, 50, 0.3)");
    grad.addColorStop(0.7, "rgba(36, 16, 50, 0.08)");
    grad.addColorStop(1, "rgba(36, 16, 50, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

function Pen() {
  const { camera, raycaster, pointer, gl } = useThree();
  const group = useRef<THREE.Group>(null!); // position + facing (yaw)
  const roller = useRef<THREE.Group>(null!); // spins about the pen's length during the roll-in
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);

  // Drag target (x/z) the pen eases toward; y is driven by lift/gravity instead.
  const target = useRef(new THREE.Vector3(...START));
  // Ground plane (y = 0) used to project the cursor into world space.
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  // Grounded blob shadow (see SHADOW_* consts). Its own group - not a child of
  // the pen - so it can stay on the desk and grow while the pen lifts away.
  const shadow = useRef<THREE.Group>(null!);
  const shadowTex = useShadowTexture();
  const shadowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: SHADOW_OPACITY.rest,
      }),
    [shadowTex],
  );
  const shadowMatRef = useRef(shadowMat);
  useEffect(() => () => shadowMat.dispose(), [shadowMat]);

  // Vertical velocity for the settle when a lifted pen is released.
  const yVel = useRef(0);
  // Intro roll-in progress (0 → 1); once done, normal drag/settle takes over.
  const introT = useRef(0);
  const introDone = useRef(false);

  // Releasing outside the canvas should still drop the pen.
  useEffect(() => {
    const stop = () => {
      draggingRef.current = false;
      setDragging(false);
      document.body.style.cursor = "auto";
      // Re-enable text selection once the drag ends (see onPointerDown).
      document.body.style.userSelect = "";
      document.body.style.removeProperty("-webkit-user-select");
    };
    window.addEventListener("pointerup", stop);
    return () => window.removeEventListener("pointerup", stop);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05); // guard against a big step after a tab refocus
    const g = group.current;

    // Track the shadow to the pen's x/z (plus the fixed down-right offset), and
    // scale/fade it by how high the pen has lifted. Called from every path below
    // so the shadow stays in step during the intro roll, drags, and the settle.
    const drawShadow = () => {
      const s = shadow.current;
      if (!s) return;
      const f = THREE.MathUtils.clamp((g.position.y - REST_Y) / (LIFT_Y - REST_Y), 0, 1);
      s.position.x = g.position.x + THREE.MathUtils.lerp(SHADOW_OFFSET_X.rest, SHADOW_OFFSET_X.lift, f);
      s.position.z = g.position.z + THREE.MathUtils.lerp(SHADOW_OFFSET_Z.rest, SHADOW_OFFSET_Z.lift, f);
      s.scale.set(
        THREE.MathUtils.lerp(SHADOW_LEN.rest, SHADOW_LEN.lift, f),
        1,
        THREE.MathUtils.lerp(SHADOW_WID.rest, SHADOW_WID.lift, f),
      );
      shadowMatRef.current.opacity = THREE.MathUtils.lerp(
        SHADOW_OPACITY.rest,
        SHADOW_OPACITY.lift,
        f,
      );
    };

    // Intro: roll in from off-screen bottom-right, spinning about the pen's
    // length, decelerating into the resting spot. Grabbing the pen skips it.
    if (!introDone.current && !draggingRef.current) {
      introT.current = Math.min(1, introT.current + dt / INTRO_DURATION);
      const e = 1 - Math.pow(1 - introT.current, 4); // ease-out quart - momentum that bleeds off with weight
      g.position.set(
        THREE.MathUtils.lerp(INTRO_START[0], START[0], e),
        REST_Y,
        THREE.MathUtils.lerp(INTRO_START[2], START[2], e),
      );
      roller.current.rotation.x = INTRO_TURNS * (1 - e); // unwinds to 0 ⇒ logo on top
      target.current.set(START[0], REST_Y, START[2]); // hold here once the intro ends
      if (introT.current >= 1) introDone.current = true;
      drawShadow();
      return;
    }

    // Horizontal: ease toward the cursor (or hold where it was dropped).
    target.current.x = THREE.MathUtils.clamp(target.current.x, -BOUNDS.x, BOUNDS.x);
    target.current.z = THREE.MathUtils.clamp(target.current.z, -BOUNDS.z, BOUNDS.z);
    g.position.x = THREE.MathUtils.damp(g.position.x, target.current.x, 9, dt);
    g.position.z = THREE.MathUtils.damp(g.position.z, target.current.z, 9, dt);

    // Vertical: lift smoothly while held; otherwise fall under gravity and settle
    // with all but no bounce. This also powers the short drop-in on first render
    // (the pen starts just above the table).
    if (dragging) {
      g.position.y = THREE.MathUtils.damp(g.position.y, LIFT_Y, 9, dt);
      yVel.current = 0;
    } else {
      yVel.current += GRAVITY * dt;
      g.position.y += yVel.current * dt;
      if (g.position.y <= REST_Y) {
        g.position.y = REST_Y;
        const impact = -yVel.current; // downward speed at touchdown
        yVel.current = impact > REST_VEL ? impact * RESTITUTION : 0; // all but no bounce
      }
    }

    drawShadow();
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    gl.domElement.setPointerCapture?.(e.pointerId);

    // Grabbing ends the intro roll-in for good. If it wasn't finished, mark it
    // done and snap the roll to 0 (wordmark on top); otherwise releasing would
    // replay the roll and snap the pen back to its start point. Pin the drag
    // target to the pen's current spot so it holds here until actually moved.
    if (!introDone.current) {
      introDone.current = true;
      introT.current = 1;
      roller.current.rotation.x = 0;
    }
    target.current.copy(group.current.position);

    // Project the cursor onto the ground to grab the pen without it jumping.
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      offset.set(group.current.position.x - hit.x, 0, group.current.position.z - hit.z);
    } else {
      offset.set(0, 0, 0);
    }
    draggingRef.current = true;
    setDragging(true);
    document.body.style.cursor = "grabbing";
    // Suppress text selection while dragging. The pen's canvas is
    // pointer-transparent and r3f listens on the splash root, so without this a
    // drag across the headline would select the text under the cursor. Set here
    // on grab (before the compatibility mousedown fires) and cleared in `stop`.
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none");
  };

  return (
    <>
      <group
        ref={group}
        position={INTRO_START}
        rotation={[0, YAW, 0]}
        scale={SCALE}
        onPointerDown={onPointerDown}
        onPointerOver={() => {
          if (!draggingRef.current) document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          if (!draggingRef.current) document.body.style.cursor = "auto";
        }}
      >
        <group ref={roller}>
          <PenModel />
        </group>
      </group>

      {/* Grounded blob shadow, driven in useFrame. Yawed to lie along the pen and
          kept off the pen group so it can stay on the desk as the pen lifts. */}
      <group
        ref={shadow}
        rotation={[0, YAW, 0]}
        position={[START[0] + SHADOW_OFFSET_X.rest, SHADOW_Y, START[2] + SHADOW_OFFSET_Z.rest]}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={shadowMat}>
          <planeGeometry args={[1, 1]} />
        </mesh>
      </group>

      {/* Invisible ground catcher: gives every drag-move a world point on y = 0.
          Kept visible (opacity 0) so the raycaster still hits it; it sits behind
          the pen so the pen's own pointer-down wins. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (!draggingRef.current) return;
          target.current.x = e.point.x + offset.x;
          target.current.z = e.point.z + offset.z;
        }}
        onPointerUp={() => {
          draggingRef.current = false;
          setDragging(false);
          document.body.style.cursor = "grab";
        }}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function PenScene({
  eventSource,
}: {
  eventSource: RefObject<HTMLElement | null>;
}) {
  return (
    // Pointer events come from the splash root (`eventSource`), not the canvas.
    // r3f makes its own canvas wrapper `pointer-events: none` whenever an
    // eventSource is set, so the pen is painted on top yet never steals clicks
    // from the hero text or CTAs. We keep r3f's DEFAULT offset-based hit compute
    // (NOT eventPrefix="client"): the canvas fills the splash root exactly, so an
    // event's offset within the root already maps to canvas space. clientX/Y
    // would ignore the splash's offset below the sticky nav, so the ray would
    // land above the cursor and the pen could never be grabbed.
    <Canvas
      eventSource={eventSource as RefObject<HTMLElement>}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      // Near top-down: looking down the table from above with a slight tilt, so
      // a lifted pen reads as both rising toward the viewer and pulling away
      // from its shadow. up = -Z keeps screen-up mapped to world -Z.
      camera={{ position: [0, 6, 0.9], fov: 30 }}
      onCreated={({ camera }) => {
        camera.up.set(0, 0, -1);
        camera.lookAt(0, 0, 0);
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />

      <Pen />

      {/* Studio image-based lighting built from emissive panels - no external
          HDR fetch, so it stays self-contained. frames={1} renders it once. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.1} position={[-5, 2, 2]} scale={[3, 5, 1]} />
        <Lightformer intensity={1.6} position={[5, 3, -2]} scale={[4, 4, 1]} />
        <Lightformer
          intensity={0.7}
          position={[0, -4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
        />
      </Environment>
    </Canvas>
  );
}
