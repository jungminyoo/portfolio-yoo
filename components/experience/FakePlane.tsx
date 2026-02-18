import { FLOOR_SCALE, START_HEIGHT } from "@/resources/constants";
import useExperience from "@/stores/useExperience";
import { ThreeEvent } from "@react-three/fiber";
import { useCallback } from "react";

export default function FakePlane() {
  const step = useExperience((state) => state.step);
  const follow = useExperience((state) => state.follow);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (step === "ready") {
        follow(event.point);
      }
    },
    [step, follow],
  );

  return (
    <>
      <mesh
        position={[0, START_HEIGHT, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={FLOOR_SCALE}
        onClick={handleClick}
      >
        <meshBasicMaterial opacity={0} transparent />
        <planeGeometry />
      </mesh>
    </>
  );
}
