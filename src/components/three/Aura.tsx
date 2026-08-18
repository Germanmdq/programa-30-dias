import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// ── simplex 3D noise GLSL helpers ──
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Description : Array and textureless GLSL 2D/3D/4D simplex 
  //               noise functions.
  //      Author : Ian McEwan, Ashima Arts.
  //  Maintainer : stegu
  //     Lastmod : 20110822 (ijm)
  //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
  //               Distributed under the MIT License. See LICENSE file.
  //               https://github.com/ashima/webgl-noise
  //               https://github.com/stegu/webgl-noise

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, D.yyy) );
    vec3 x0 =   v - i + dot(i, D.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;      // Box coordinates [0, 1]

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0) )
             + i.y + vec4(0.0, i1.y, i2.y, 1.0) )
             + i.x + vec4(0.0, i1.x, i2.x, 1.0) );

    // Gradients
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = vUv;
    vec3 coord = vec3(uv * 1.2, uTime * 0.035);
    
    float n = 0.0;
    n += 0.5 * snoise(coord);
    n += 0.25 * snoise(coord * 2.0);
    n += 0.125 * snoise(coord * 4.0);
    
    n = n * 0.5 + 0.5; // map to [0, 1]
    n = pow(n, 3.0); // raise to power 3
    
    vec3 bgColor = vec3(0.031, 0.035, 0.039); // #08090a
    vec3 ambarColor = vec3(0.85, 0.59, 0.35); // #d9975a
    
    vec3 finalColor = mix(bgColor, ambarColor, n);
    gl_FragColor = vec4(finalColor, 0.28);
  }
`;

// ── Background noise volumetric plane ──
function NieblaPlano() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ── Polvo en suspensión (Suspended dust particles) ──
function Polvo({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const geo = points.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Move Y up
      posAttr.array[idx + 1] += 0.02;
      // Lateral drift
      posAttr.array[idx] += Math.sin(time * 0.15 + i) * 0.0015;

      // Wrap Y bottom
      if (posAttr.array[idx + 1] > 5) {
        posAttr.array[idx + 1] = -5;
        posAttr.array[idx] = (Math.random() - 0.5) * 14;
        posAttr.array[idx + 2] = (Math.random() - 0.5) * 6;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.5}
        color="#f4f5f6"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Luz esférica que sigue el scroll ──
function ScrollSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const html = document.documentElement;
    const scrollTop = window.scrollY;
    const maxScroll = html.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    // Map scroll progress to Y coordinates (moves Y down from +3 to -15)
    mesh.position.y = 3 - progress * 18;
  });

  return (
    <mesh ref={meshRef} position={[0, 3, -3]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color="#d9975a"
        transparent={true}
        opacity={0.07}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Main Canvas Component ──
export default function Aura() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion check
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', handleMotionChange);

    // Mobile/Width check
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => {
      media.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-sala"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(217, 151, 90, 0.06) 0%, #08090a 70%)',
        }}
        aria-hidden="true"
      />
    );
  }

  const particleCount = isMobile ? 450 : 900;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 5] }}
        dpr={[1, 1.75]}
        gl={{ depth: false, antialias: false }}
      >
        <NieblaPlano />
        <Polvo count={particleCount} />
        <ScrollSphere />
      </Canvas>
    </div>
  );
}
