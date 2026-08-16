"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, useGLTF } from "@react-three/drei";
import type { Group } from "three";

// Cache-bust so a replaced model file isn't served stale from the browser's
// HTTP cache under the same /models/cap/scene.gltf URL.
const MODEL_URL = "/models/cap/scene.gltf?v=2";

function CapModel() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
    </div>
  );
}

export default function CapScene() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4], fov: 24 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 5]} intensity={1.4} />
          <directionalLight position={[-5, -2, -4]} intensity={0.35} />
          <Bounds fit clip observe margin={0.15}>
            <CapModel />
          </Bounds>
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
