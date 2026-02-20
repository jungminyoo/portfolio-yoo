import useExperience from "@/stores/useExperience";
import { Text3D } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface LetterProps {
  content: string;
  size?: number;
  height?: number;
  material: THREE.Material;
  position: ThreeElements["object3D"]["position"];
}

export default function Letter({
  content,
  size = 1,
  height = 0.5,
  material,
  position,
}: LetterProps) {
  const step = useExperience((state) => state.step);

  return (
    <RigidBody
      type={step !== "ready" && step !== "following" ? "dynamic" : "fixed"}
      position={position}
      restitution={0.1}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <Text3D
        font="./fonts/Bebas_Neue/Bebas_Neue_Regular.json"
        material={material}
        size={size}
        height={height}
        castShadow
        receiveShadow
      >
        {content}
      </Text3D>
    </RigidBody>
  );
}
