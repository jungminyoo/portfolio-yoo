import {
  OrbitControls,
  shaderMaterial,
  useHelper,
  useKeyboardControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import paperVertexShaders from "@/shaders/paper/vertex.glsl";
import paperFragmentShaders from "@/shaders/paper/fragment.glsl";
import {
  extend,
  ThreeElement,
  ThreeElements,
  useFrame,
} from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import findNearestUvIndex from "@/utils/findNearestUvIndex";

const PaperMaterial = shaderMaterial(
  {
    uPenUv: new THREE.Vector2(0, 0),
  },
  paperVertexShaders,
  paperFragmentShaders,
);

extend({ PaperMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    paperMaterial: ThreeElement<typeof PaperMaterial>;
  }
}

const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);

export default function Experience() {
  const paperMaterial = useRef<ThreeElements["paperMaterial"]>(null!);
  const penBody = useRef<RapierRigidBody>(null!);
  const aInkRef = useRef<Float32Array | null>(null);
  const aInkAttrRef = useRef<THREE.BufferAttribute | null>(null);

  const [smoothedNewPosition] = useState(() => new THREE.Vector3(0, 0.375, 0));
  const [targetPosition] = useState(() => new THREE.Vector3(0, 0.375, 0));

  const [_, getKeys] = useKeyboardControls();

  useEffect(() => {
    const count = planeGeometry.attributes.position.count;
    const aInk = new Float32Array(count); // 0으로 자동 초기화
    const attr = new THREE.BufferAttribute(aInk, 1);

    planeGeometry.setAttribute("aInk", attr);

    aInkRef.current = aInk;
    aInkAttrRef.current = attr;
    attr.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    /**
     * Keyboard Event
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const newPosition = new THREE.Vector3();
    newPosition.copy(targetPosition);

    const speed = delta * 5;
    if (forward) newPosition.z -= speed;
    if (rightward) newPosition.x += speed;
    if (backward) newPosition.z += speed;
    if (leftward) newPosition.x -= speed;

    targetPosition.copy(newPosition);
    smoothedNewPosition.lerp(targetPosition, delta * 2);

    penBody.current.setNextKinematicTranslation(smoothedNewPosition);

    /**
     * Shaders
     */
    const uPenUv = paperMaterial.current.uPenUv;
    if (uPenUv && uPenUv instanceof THREE.Vector2) {
      uPenUv.x = (smoothedNewPosition.x + 5) / 10;
      uPenUv.y = (-smoothedNewPosition.z + 5) / 10;
    }

    // update aInk
    const aInk = aInkRef.current;
    const aInkAttr = aInkAttrRef.current;
    if (!aInk || !aInkAttr) return;

    const uv = paperMaterial.current.uPenUv as THREE.Vector2;

    for (let i = 0; i < aInk.length; i++) {
      if (aInk) aInk[i] *= 0.99;
    }

    const idx = findNearestUvIndex(planeGeometry, uv);
    aInk[idx] = 1.0;

    aInkAttr.needsUpdate = true;
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        args={["#ffffff", 4]}
        position={[4, 4, 1]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      <ambientLight intensity={2.5} />

      <RigidBody ref={penBody} type="kinematicPosition">
        <mesh castShadow rotation-x={Math.PI}>
          <coneGeometry args={[0.25, 0.75, 6, 1]} />
          <meshStandardMaterial color="#ffa600" />
        </mesh>
      </RigidBody>

      <mesh
        geometry={planeGeometry}
        receiveShadow
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={[10, 10, 10]}
      >
        <paperMaterial ref={paperMaterial} />
      </mesh>
    </>
  );
}
