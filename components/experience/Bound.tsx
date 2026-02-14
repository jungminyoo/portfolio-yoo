import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bound() {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0.5}>
        <CuboidCollider args={[10.5, 0.1, 4.5]} position={[0, -0.1, 0]} />
      </RigidBody>
    </>
  );
}
