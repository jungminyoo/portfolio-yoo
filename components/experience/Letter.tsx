import { Text3D } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface LetterProps {
  content: string;
  material: THREE.Material;
  position: ThreeElements["object3D"]["position"];
}

export default function Letter({ content, material, position }: LetterProps) {
  return (
    <RigidBody
      //   type="fixed"
      position={position}
      restitution={0.2}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <Text3D
        font="./fonts/pretendard/pretendard_bold.json"
        material={material}
        size={1}
        height={0.5}
        letterSpacing={-0.1}
        castShadow
        receiveShadow
      >
        {content}
      </Text3D>
    </RigidBody>
  );
}
