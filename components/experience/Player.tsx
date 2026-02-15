import { START_CAMERA_HEIGHT } from "@/resources/constants";
import { mainMaterial } from "@/resources/materials";
import useExperience from "@/stores/useExperience";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Player() {
  const step = useExperience((state) => state.step);
  const cursorFallPosition = useExperience((state) => state.cursorFallPosition);
  const landed = useExperience((state) => state.landed);

  const [_, getKeys] = useKeyboardControls();

  const cursorBody = useRef<RapierRigidBody>(null!);

  const [smoothedNewPosition] = useState(() => new THREE.Vector3());
  const [targetPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(0, START_CAMERA_HEIGHT, 0),
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (step === "landed") return;

    const cursorPosition = cursorBody.current.translation();
    const cursorY = cursorPosition.y;

    if (cursorY < 0.1) {
      cursorPosition.y = 0.1;
      targetPosition.copy(cursorPosition);
      smoothedNewPosition.copy(cursorPosition);
      landed();
    }
  });

  useFrame((state, delta) => {
    if (step === "ready") return;

    /**
     * Camera
     */
    const cursorPosition = cursorBody.current.translation();

    // 카메라 자체의 position
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(cursorPosition);
    cameraPosition.x += 5;
    cameraPosition.z += 5;
    cameraPosition.y += 10;

    // 카메라가 바라보는 위치의 position
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(cursorPosition);

    // 카메라가 부드럽게 따라가도록 lerping, delta 사용해서 frame rate 상관없이 움직이도록
    smoothedCameraPosition.lerp(cameraPosition, delta * 2);
    smoothedCameraTarget.lerp(cameraTarget, delta * 2);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  useFrame((_, delta) => {
    if (step === "falling") return;

    /**
     * Keyboard Event
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const newPosition = new THREE.Vector3();
    newPosition.copy(targetPosition);

    const speed = delta * 4;
    if (forward) newPosition.z -= speed;
    if (rightward) newPosition.x += speed;
    if (backward) newPosition.z += speed;
    if (leftward) newPosition.x -= speed;

    targetPosition.copy(newPosition);
    smoothedNewPosition.lerp(targetPosition, delta * 2);

    cursorBody.current.setNextKinematicTranslation(smoothedNewPosition);
  });

  return (
    <>
      <RigidBody
        ref={cursorBody}
        type={step === "falling" ? "dynamic" : "kinematicPosition"}
        position={cursorFallPosition}
        scale={[0.1, 0.1, 0.1]}
        colliders={false}
      >
        <CylinderCollider args={[1, 1]} restitution={0} friction={0} />
        <mesh castShadow material={mainMaterial}>
          <cylinderGeometry args={[1, 1, 2]} />
        </mesh>
      </RigidBody>
    </>
  );
}
