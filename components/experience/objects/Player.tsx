import { START_CAMERA_HEIGHT } from "@/resources/constants";
import { mainMaterial } from "@/resources/materials";
import useExperience from "@/stores/useExperience";
import useMouse from "@/stores/useMouse";
import {
  getCameraPlaneTargetY,
  getCameraPosition,
  getCameraQuaternion,
} from "@/utils/camera";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Player() {
  const domElement = useThree((state) => state.gl.domElement);

  const step = useExperience((state) => state.step);
  const cursorFallPosition = useExperience((state) => state.cursorFallPosition);
  const fall = useExperience((state) => state.fall);
  const landed = useExperience((state) => state.landed);

  const mouseForward = useMouse((state) => state.mouseForward);
  const mouseRightward = useMouse((state) => state.mouseRightward);
  const mouseBackward = useMouse((state) => state.mouseBackward);
  const mouseLeftward = useMouse((state) => state.mouseLeftward);

  const [_, getKeys] = useKeyboardControls();

  const cursorBody = useRef<RapierRigidBody>(null!);
  const cursorMesh = useRef<THREE.Mesh>(null!);
  const firstCameraPosition = useRef<THREE.Vector3>(null);
  const firstCameraQuaternion = useRef<THREE.Quaternion>(null);

  const [newPosition] = useState(() => new THREE.Vector3());
  const [targetPosition] = useState(() => new THREE.Vector3());
  const [smoothedNewTorusPosition] = useState(() => new THREE.Vector3());
  const [smoothedNewPosition] = useState(() => new THREE.Vector3());

  const [cameraTarget] = useState(() => new THREE.Vector3());
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(0, START_CAMERA_HEIGHT, 0),
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 0, 0));

  // following
  useFrame((state, delta) => {
    if (
      step === "loading" ||
      step === "ready" ||
      step === "falling" ||
      step === "landed"
    )
      return;

    if (
      firstCameraPosition.current === null ||
      firstCameraQuaternion.current === null
    ) {
      firstCameraPosition.current = getCameraPosition(cursorFallPosition);
      firstCameraQuaternion.current = getCameraQuaternion(
        firstCameraPosition.current,
        cursorFallPosition,
      );
    }

    smoothedCameraPosition.lerp(firstCameraPosition.current, delta * 2);
    state.camera.position.copy(smoothedCameraPosition);

    state.camera.quaternion.slerp(firstCameraQuaternion.current, delta * 2.5);

    if (smoothedCameraPosition.distanceTo(firstCameraPosition.current) < 0.5) {
      // set current direction as initial direction of smoothedCameraTarget
      smoothedCameraTarget.copy(
        getCameraPlaneTargetY(
          state.camera.position,
          state.camera.quaternion,
          cursorFallPosition.y,
        ),
      );
      fall();
    }
  });

  // falling -> landed
  useFrame(() => {
    if (step === "landed") return;

    const cursorPosition = cursorBody.current.translation();
    const cursorY = cursorPosition.y;

    cursorMesh.current.position.copy(cursorPosition);

    if (cursorY < 0.1) {
      cursorPosition.y = 0.1;
      targetPosition.copy(cursorPosition);
      smoothedNewPosition.copy(cursorPosition);
      smoothedNewTorusPosition.copy(cursorPosition);
      landed();
    }
  });

  // falling & landed
  useFrame((state, delta) => {
    if (step === "loading" || step === "ready" || step === "following") return;

    /**
     * Camera
     */
    const cursorPosition = cursorBody.current.translation();

    // 카메라 자체의 position
    const cameraPosition = getCameraPosition(cursorPosition);

    // 카메라가 바라보는 위치의 position
    cameraTarget.copy(cursorPosition);

    // 카메라가 부드럽게 따라가도록 lerping, delta 사용해서 frame rate 상관없이 움직이도록
    smoothedCameraPosition.lerp(cameraPosition, delta * 2);
    smoothedCameraTarget.lerp(cameraTarget, delta * 2);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  // after landing
  useFrame((_, delta) => {
    if (step === "following" || step === "falling") return;

    /**
     * Keyboard Event
     */
    const { forward, backward, leftward, rightward } = getKeys();

    newPosition.copy(targetPosition);

    const speed = document.pointerLockElement !== domElement ? 0 : delta * 4;
    if (forward || mouseForward) newPosition.setZ(newPosition.z - speed);
    if (rightward || mouseRightward) newPosition.setX(newPosition.x + speed);
    if (backward || mouseBackward) newPosition.setZ(newPosition.z + speed);
    if (leftward || mouseLeftward) newPosition.setX(newPosition.x - speed);

    targetPosition.copy(newPosition);
    smoothedNewPosition.lerp(targetPosition, delta * 2);
    smoothedNewTorusPosition.lerp(targetPosition, delta * 1.8);

    cursorMesh.current.position.copy(smoothedNewPosition);
    cursorBody.current.setNextKinematicTranslation(smoothedNewTorusPosition);
  });

  return (
    <>
      <RigidBody
        ref={cursorBody}
        type={step === "falling" ? "dynamic" : "kinematicPosition"}
        position={[
          cursorFallPosition.x,
          cursorFallPosition.y,
          cursorFallPosition.z,
        ]}
        scale={[0.1, 0.1, 0.1]}
        colliders={false}
      >
        <CylinderCollider args={[1, 4.15]} restitution={0} friction={0} />
        <mesh castShadow material={mainMaterial} rotation-x={Math.PI * 0.5}>
          <torusGeometry args={[4, 0.3, 6, 30]} />
        </mesh>
      </RigidBody>
      <mesh ref={cursorMesh} castShadow material={mainMaterial}>
        <sphereGeometry args={[0.1, 20, 20]} />
      </mesh>
    </>
  );
}
