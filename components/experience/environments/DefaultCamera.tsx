import { FLOOR_SCALE, START_CAMERA_HEIGHT } from "@/resources/constants";
import useExperience from "@/stores/useExperience";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DefaultCamera() {
  const step = useExperience((state) => state.step);

  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  const camera = useRef<THREE.PerspectiveCamera>(null!);

  useEffect(() => {
    if (step !== "loading" && step !== "ready") return;

    const planeWidth = FLOOR_SCALE[0];
    const distance = START_CAMERA_HEIGHT;
    const aspect = width / height;

    const fovRad = 2 * Math.atan(planeWidth / (2 * distance * aspect));

    camera.current.fov = THREE.MathUtils.radToDeg(fovRad);

    camera.current.updateProjectionMatrix();
  }, [width, height]);

  return (
    <PerspectiveCamera
      makeDefault
      ref={camera}
      near={0.1}
      far={200}
      position={[0, START_CAMERA_HEIGHT, 0]}
    />
  );
}
