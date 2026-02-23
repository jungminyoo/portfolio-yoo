import { FLOOR_SCALE } from "@/resources/constants";
import { floorMaterial, floorUniformData } from "@/resources/materials";

import { useFrame } from "@react-three/fiber";

export default function Floor() {
  useFrame((state) => {
    floorUniformData.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <mesh
        receiveShadow
        material={floorMaterial}
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={FLOOR_SCALE}
      >
        <planeGeometry />
      </mesh>
    </>
  );
}
