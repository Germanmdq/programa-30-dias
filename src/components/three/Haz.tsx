import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uBaseOpacity;
  uniform float uFadeIn;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    // Source of the light in plane coordinates
    vec2 source = vec2(-1.0, 1.0);
    vec2 diff = uv * 2.0 - 1.0 - source;
    
    float angle = atan(diff.y, diff.x);
    float center = -0.785; // Diagonal down-right (approx -45 degrees)
    
    float dist = abs(angle - center);
    float beam = smoothstep(0.45, 0.0, dist);
    
    float len = length(diff);
    float fade = smoothstep(2.8, 0.0, len);
    
    vec3 ambar = vec3(0.85, 0.59, 0.35); // #d9975a
    
    gl_FragColor = vec4(ambar, beam * fade * uBaseOpacity * uFadeIn);
  }
`;

function BeamPlane({
  scale,
  rotation,
  baseOpacity,
  period,
}: {
  scale: [number, number, number];
  rotation: [number, number, number];
  baseOpacity: number;
  period: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uBaseOpacity: { value: baseOpacity },
      uFadeIn: { value: 0 },
    }),
    [baseOpacity]
  );

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    const time = state.clock.getElapsedTime();
    
    // Fade-in transition: starts at 1.6s delay, duration 2.0s
    const delay = 1.6;
    const duration = 2.0;
    const fadeIn = Math.max(0, Math.min(1, (time - delay) / duration));
    mat.uniforms.uFadeIn.value = fadeIn;

    // Slow organic breathing oscillation
    const osc = 0.85 + 0.15 * Math.sin(time * (2 * Math.PI / period));
    mat.uniforms.uBaseOpacity.value = baseOpacity * osc;
  });

  return (
    <mesh scale={scale} rotation={rotation}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Haz() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMotion = () => {
      setDisabled(media.matches);
    };
    checkMotion();
    media.addEventListener('change', checkMotion);
    return () => media.removeEventListener('change', checkMotion);
  }, []);

  if (disabled) return null;

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none w-full h-full mix-blend-screen"
      aria-hidden="true"
    >
      <Canvas camera={{ fov: 50, position: [0, 0, 2] }} dpr={[1, 1.75]}>
        {/* Layer 1: scaled 1.25, rotated +18deg, period 7s */}
        <BeamPlane
          scale={[1.25, 1.25, 1]}
          rotation={[0, 0, THREE.MathUtils.degToRad(18)]}
          baseOpacity={0.10}
          period={7}
        />
        {/* Layer 2: scaled 1.4, rotated 0deg, period 11s */}
        <BeamPlane
          scale={[1.4, 1.4, 1]}
          rotation={[0, 0, 0]}
          baseOpacity={0.07}
          period={11}
        />
        {/* Layer 3: scaled 1.1, rotated -18deg, period 13s */}
        <BeamPlane
          scale={[1.1, 1.1, 1]}
          rotation={[0, 0, THREE.MathUtils.degToRad(-18)]}
          baseOpacity={0.04}
          period={13}
        />
      </Canvas>
    </div>
  );
}
