import useExperience from "@/stores/useExperience";
import { Helper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const step = useExperience((state) => state.step);

  const light = useRef<THREE.DirectionalLight>(null!);

  useFrame((state) => {
    if (step === "ready") return;

    light.current.position.z = state.camera.position.z + 2;
    light.current.position.x = state.camera.position.x + 2;
    light.current.position.y = state.camera.position.y;
    light.current.target.position.z = state.camera.position.z - 5;
    light.current.target.position.x = state.camera.position.x - 5;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        args={["#ffffff", 2]}
        position={[12.4, 12.4, 8]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          near={1}
          far={20}
          top={8}
          right={8}
          bottom={-5}
          left={-8}
        >
          {/* <Helper type={THREE.CameraHelper} /> */}
        </orthographicCamera>
      </directionalLight>

      <ambientLight intensity={2.5} />
    </>
  );
}
