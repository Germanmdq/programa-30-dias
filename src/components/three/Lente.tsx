import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

function VidrioEsfera() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef<{ uTime: { value: number } } | null>(null);

  const isHovered = useRef(false);

  // Compile displacement shader in vertex stage
  const onBeforeCompile = useMemo(() => {
    return (shader: any) => {
      shader.uniforms.uTime = { value: 0 };
      uniformsRef.current = shader.uniforms as any;

      shader.vertexShader = `
        uniform float uTime;
        
        // Simplex 3D noise generator
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, D.yyy) );
          vec3 x0 =   v - i + dot(i, D.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0 );
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0) )
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0) )
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0) );
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
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
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                        dot(p2,x2), dot(p3,x3) ) );
        }
        
        \${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float disp = snoise(position * 2.0 + uTime * 0.25) * 0.06;
        transformed = position + normal * disp;
        `
      );
    };
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (isHovered.current) {
      // incline following pointer (max 0.3 rads)
      const targetX = -state.pointer.y * 0.3;
      const targetY = state.pointer.x * 0.3;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.05);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.05);
    } else {
      // auto Y-rotation (0.15 rad/s), X back to 0
      mesh.rotation.y += 0.15 * delta;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0, 0.05);
    }

    if (uniformsRef.current) {
      uniformsRef.current.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        isHovered.current = true;
      }}
      onPointerOut={() => {
        isHovered.current = false;
      }}
    >
      <icosahedronGeometry args={[1.25, 6]} />
      <MeshTransmissionMaterial
        onBeforeCompile={onBeforeCompile}
        transmission={1}
        thickness={1.6}
        roughness={0.12}
        ior={1.45}
        chromaticAberration={0.06}
        backside={true}
        samples={6}
        resolution={512}
        color="#ffffff"
        attenuationColor="#d9975a"
        attenuationDistance={1.2}
      />
    </mesh>
  );
}

export default function Lente() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion check
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkWidthAndMotion = () => {
      setDisabled(media.matches || window.innerWidth < 768);
    };
    checkWidthAndMotion();
    media.addEventListener('change', checkWidthAndMotion);
    window.addEventListener('resize', checkWidthAndMotion);

    return () => {
      media.removeEventListener('change', checkWidthAndMotion);
      window.removeEventListener('resize', checkWidthAndMotion);
    };
  }, []);

  if (disabled) {
    return (
      <div className="relative flex h-[300px] md:h-[420px] w-full items-center justify-center">
        {/* Static blurred radial glow */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(217, 151, 90, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Simple 2D glass-sphere visual representation */}
        <div className="relative w-44 h-44 rounded-full border border-white/10 bg-white/5 backdrop-blur-[4px] shadow-2xl flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-white/5 bg-gradient-to-tr from-[#d9975a]/10 to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-[300px] md:h-[420px] w-full">
      <div className="h-full w-full">
        <Canvas camera={{ fov: 45, position: [0, 0, 4.5] }} dpr={[1, 1.75]}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[4, 3, 2]} intensity={2.2} color="#ffd9a8" />
          <pointLight position={[-3, -1, 2]} intensity={1.2} color="#d9975a" />
          <VidrioEsfera />
          <Environment preset="sunset" background={false} />
        </Canvas>
      </div>
      <span className="text-[0.75rem] text-luz-baja mt-2 select-none pointer-events-none">
        Movela con el dedo
      </span>
    </div>
  );
}
