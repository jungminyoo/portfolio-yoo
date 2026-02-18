import {
  BOUND_HEIGHT,
  BOUND_HEIGHT_OFFSET,
  BOUND_THICKNESS,
  FLOOR_SCALE,
} from "@/resources/constants";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bound() {
  return (
    <>
      <RigidBody type="fixed" restitution={0.1} friction={0.5}>
        <CuboidCollider
          args={[FLOOR_SCALE[0] / 2, BOUND_THICKNESS / 2, FLOOR_SCALE[1] / 2]}
          position={[0, -BOUND_THICKNESS / 2, 0]}
        />
        <CuboidCollider
          args={[FLOOR_SCALE[0] / 2, BOUND_HEIGHT / 2, BOUND_THICKNESS / 2]}
          position={[
            0,
            BOUND_HEIGHT / 2 - BOUND_HEIGHT_OFFSET,
            -(FLOOR_SCALE[1] / 2 + BOUND_THICKNESS / 2),
          ]}
        />
        <CuboidCollider
          args={[FLOOR_SCALE[0] / 2, BOUND_HEIGHT / 2, BOUND_THICKNESS / 2]}
          position={[
            0,
            BOUND_HEIGHT / 2 - BOUND_HEIGHT_OFFSET,
            FLOOR_SCALE[1] / 2 + BOUND_THICKNESS / 2,
          ]}
        />
        <CuboidCollider
          args={[BOUND_THICKNESS / 2, BOUND_HEIGHT / 2, FLOOR_SCALE[1] / 2]}
          position={[
            -(FLOOR_SCALE[0] / 2 + BOUND_THICKNESS / 2),
            BOUND_HEIGHT / 2 - BOUND_HEIGHT_OFFSET,
            0,
          ]}
        />
        <CuboidCollider
          args={[BOUND_THICKNESS / 2, BOUND_HEIGHT / 2, FLOOR_SCALE[1] / 2]}
          position={[
            FLOOR_SCALE[0] / 2 + BOUND_THICKNESS / 2,
            BOUND_HEIGHT / 2 - BOUND_HEIGHT_OFFSET,
            0,
          ]}
        />
      </RigidBody>
    </>
  );
}
