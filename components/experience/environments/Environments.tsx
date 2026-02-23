import { Environment } from "@react-three/drei";
import {
  floorEnvironmentMaterial,
  floorEnvironmentUniformData,
} from "@/resources/materials";
import { FLOOR_SCALE } from "@/resources/constants";
import { useFrame } from "@react-three/fiber";

export default function Environments() {
  useFrame((state) => {
    floorEnvironmentUniformData.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <Environment frames={Infinity} preset="park" resolution={16}>
        <mesh
          receiveShadow
          material={floorEnvironmentMaterial}
          position={[0, -1, 0]}
          rotation-x={-Math.PI * 0.5}
          scale={FLOOR_SCALE}
        >
          <planeGeometry />
        </mesh>
      </Environment>
    </>
  );
}
