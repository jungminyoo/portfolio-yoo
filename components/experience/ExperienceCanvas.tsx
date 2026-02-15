"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Experience from "./Experience";
import Cursor from "../web/Cursor";
import useExperience from "@/stores/useExperience";
import { START_CAMERA_HEIGHT } from "@/resources/constants";

export default function ExperienceCanvas() {
  const step = useExperience((state) => state.step);

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
          camera={{
            fov: 31,
            near: 0.1,
            far: 200,
            position: [0, START_CAMERA_HEIGHT, 0],
          }}
        >
          <Physics>
            <Experience />
          </Physics>
        </Canvas>
      </KeyboardControls>
      {step === "ready" && <Cursor />}
    </>
  );
}
