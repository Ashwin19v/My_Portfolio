"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 3 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.008;
    const posArr = mesh.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] +=
        Math.sin(state.clock.elapsedTime * 0.2 + posArr[i3] * 0.3) * 0.003;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---- Helper: build ellipse as line-segment pairs ---- */
function ellipseVerts(
  rx: number,
  rz: number,
  y: number,
  segs: number = 28,
): number[] {
  const v: number[] = [];
  for (let i = 0; i < segs; i++) {
    const a1 = (i / segs) * Math.PI * 2;
    const a2 = ((i + 1) / segs) * Math.PI * 2;
    v.push(
      Math.cos(a1) * rx,
      y,
      Math.sin(a1) * rz,
      Math.cos(a2) * rx,
      y,
      Math.sin(a2) * rz,
    );
  }
  return v;
}

// function CodeBrackets() {
//   const ref = useRef<THREE.Group>(null);

//   const geo = useMemo(() => {
//     const v = new Float32Array([
//       // < left bracket
//       -1.8, 1.2, 0, -2.8, 0, 0, -2.8, 0, 0, -1.8, -1.2, 0,
//       // / forward slash
//       -0.3, 1.0, 0, 0.3, -1.0, 0,
//       // > right bracket
//       1.8, 1.2, 0, 2.8, 0, 0, 2.8, 0, 0, 1.8, -1.2, 0,
//     ]);
//     const g = new THREE.BufferGeometry();
//     g.setAttribute("position", new THREE.BufferAttribute(v, 3));
//     return g;
//   }, []);

//   useFrame((s) => {
//     if (!ref.current) return;
//     ref.current.rotation.y = s.clock.elapsedTime * 0.1;
//     ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.08) * 0.1;
//     ref.current.position.y = 6 + Math.sin(s.clock.elapsedTime * 0.15) * 0.5;
//   });

//   return (
//     <group ref={ref} position={[6, 6, -8]} scale={1.3}>
//       <lineSegments geometry={geo}>
//         <lineBasicMaterial color="#A29E9E" transparent opacity={0.55} />
//       </lineSegments>
//     </group>
//   );
// }

function CurlyBraces() {
  const ref = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const v = new Float32Array([
      // { left brace
      -1.3, 1.8, 0, -1.8, 1.3, 0, -1.8, 1.3, 0, -1.8, 0.3, 0, -1.8, 0.3, 0,
      -2.3, 0.0, 0, -2.3, 0.0, 0, -1.8, -0.3, 0, -1.8, -0.3, 0, -1.8, -1.3, 0,
      -1.8, -1.3, 0, -1.3, -1.8, 0,
      // } right brace
      1.3, 1.8, 0, 1.8, 1.3, 0, 1.8, 1.3, 0, 1.8, 0.3, 0, 1.8, 0.3, 0, 2.3, 0.0,
      0, 2.3, 0.0, 0, 1.8, -0.3, 0, 1.8, -0.3, 0, 1.8, -1.3, 0, 1.8, -1.3, 0,
      1.3, -1.8, 0,
      // Code-like content lines between braces
      -0.6, 0.6, 0, 0.8, 0.6, 0, -0.4, 0.0, 0, 1.2, 0.0, 0, -0.6, -0.6, 0, 0.5,
      -0.6, 0,
    ]);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(v, 3));
    return g;
  }, []);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.08;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.1) * 0.08;
    ref.current.position.y = -4 + Math.sin(s.clock.elapsedTime * 0.2) * 0.4;
  });

  return (
    <group ref={ref} position={[-5, -4, -6]} scale={1.4}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

/* ================================================================
   7. CIRCUIT BOARD / CPU CHIP  (outer frame + grid + pins)
   Represents: Systems Engineering / Hardware / Low-level
   ================================================================ */
function CircuitChip() {
  const ref = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const v: number[] = [];
    const s = 2.5; // chip half-size

    // Outer square
    v.push(-s, s, 0, s, s, 0);
    v.push(s, s, 0, s, -s, 0);
    v.push(s, -s, 0, -s, -s, 0);
    v.push(-s, -s, 0, -s, s, 0);

    // Inner die square
    const d = 1.8;
    v.push(-d, d, 0, d, d, 0);
    v.push(d, d, 0, d, -d, 0);
    v.push(d, -d, 0, -d, -d, 0);
    v.push(-d, -d, 0, -d, d, 0);

    // Internal circuit traces (grid)
    for (let i = -1; i <= 1; i++) {
      const p = i * 0.8;
      v.push(-d, p, 0, d, p, 0);
      v.push(p, -d, 0, p, d, 0);
    }

    // Edge pins (6 per side)
    const pinCount = 6;
    const pinLen = 0.5;
    for (let i = 0; i < pinCount; i++) {
      const t = -s + 0.5 + (i / (pinCount - 1)) * (2 * s - 1);
      v.push(t, s, 0, t, s + pinLen, 0); // top
      v.push(t, -s, 0, t, -s - pinLen, 0); // bottom
      v.push(s, t, 0, s + pinLen, t, 0); // right
      v.push(-s, t, 0, -s - pinLen, t, 0); // left
    }

    // Diagonal traces in quadrants
    v.push(-1.5, 1.5, 0, -0.5, 0.5, 0);
    v.push(0.5, 1.5, 0, 1.5, 0.5, 0);
    v.push(-1.5, -0.5, 0, -0.5, -1.5, 0);
    v.push(1.5, -0.5, 0, 0.5, -1.5, 0);

    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(v), 3),
    );
    return g;
  }, []);

  useFrame((st) => {
    if (!ref.current) return;
    ref.current.rotation.y = st.clock.elapsedTime * 0.05;
    ref.current.rotation.x = st.clock.elapsedTime * 0.03;
    ref.current.position.y = -54 + Math.sin(st.clock.elapsedTime * 0.16) * 0.4;
  });

  return (
    <group ref={ref} position={[6, -54, -8]} scale={1.0}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

/* ---- Scroll-linked camera ---- */
function ScrollCamera() {
  useFrame((state) => {
    const scrollY =
      typeof window !== "undefined"
        ? window.scrollY || document.documentElement.scrollTop
        : 0;
    const maxScroll =
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1;
    const progress = scrollY / (maxScroll || 1);
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      -progress * 60,
      0.05,
    );
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.3;
  });
  return null;
}

/* ================================================================
   SCENE — Compose all developer-themed models
   ================================================================ */
export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ScrollCamera />
        <Particles count={400} />

        {/* Developer-themed 3D wireframe models */}
        {/* <CodeBrackets /> */}
        <CurlyBraces />
        {/* <DatabaseIcon /> */}
        {/* <CircuitChip /> */}
      </Canvas>
    </div>
  );
}
