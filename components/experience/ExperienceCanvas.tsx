"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Experience from "./Experience";
import CustomCursor from "../web/Cursor";
import useExperience from "@/stores/useExperience";

export default function ExperienceCanvas() {
  const to3D = useExperience((state) => state.to3D);

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
          camera={{ fov: 31, near: 0.1, far: 200, position: [0, 20, 0] }}
          onClick={() => to3D()}
        >
          <Physics>
            <Experience />
          </Physics>
        </Canvas>
      </KeyboardControls>
      <CustomCursor />
    </>
  );
}
