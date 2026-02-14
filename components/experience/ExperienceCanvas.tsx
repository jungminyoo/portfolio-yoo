"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Experience from "./Experience";

export default function ExperienceCanvas() {
  return (
    <>
      <Leva collapsed />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <Canvas
          shadows
          camera={{ fov: 45, near: 0.1, far: 200, position: [0, 13, 0] }}
        >
          <Physics>
            <Experience />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
