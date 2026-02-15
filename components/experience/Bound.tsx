import { FLOOR_SCALE } from "@/resources/constants";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bound() {
  return (
    <>
      <RigidBody type="fixed" restitution={0.1} friction={0.5}>
        <CuboidCollider
          args={[FLOOR_SCALE[0] / 2, 1, FLOOR_SCALE[1] / 2]}
          position={[0, -1, 0]}
        />
      </RigidBody>
    </>
  );
}
