"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";

import Experience from "./Experience";
import Cursor from "../web/Cursor";
import useExperience from "@/stores/useExperience";
import { KEYBOARD_MAP, START_CAMERA_HEIGHT } from "@/resources/constants";
import WelcomeText from "../web/WelcomeText";
import Loading from "../web/Loading";

export default function ExperienceCanvas() {
  const step = useExperience((state) => state.step);

  return (
    <div
      className={`w-full h-full ${(step === "loading" || step === "ready") && "cursor-none"}`}
    >
      <Leva collapsed />
      <KeyboardControls map={KEYBOARD_MAP}>
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          camera={{
            fov: 31,
            near: 0.1,
            far: 200,
            position: [0, START_CAMERA_HEIGHT, 0],
          }}
        >
          <Physics debug={false}>
            <Experience />
          </Physics>
        </Canvas>
      </KeyboardControls>

      {(step === "loading" || step === "ready") && (
        <>
          <Cursor />
          <Loading />
        </>
      )}
      {step === "ready" && (
        <>
          <WelcomeText />
        </>
      )}
    </div>
  );
}
