import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function ThreeDScene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 4.5], fov: 45 }} 
      style={{ width: '100%', height: '100%', outline: 'none' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FF6B00" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#ffffff" />
      
      <mesh rotation={[0.1, 0.1, 0]}>
        <torusKnotGeometry args={[0.8, 0.24, 150, 16]} />
        <meshStandardMaterial
          color="#FF6B00"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
      
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.0}
        enablePan={false}
        makeDefault
      />
    </Canvas>
  );
}
