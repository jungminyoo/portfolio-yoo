import { useMemo, useState } from "react";
import * as THREE from "three";
import Letter from "./Letter";

interface TitleProps {
  content: string;
  letterSpacing?: number;
  offset?: [x: number, y: number, z: number];
}

export default function Title({
  content,
  letterSpacing = 0.8,
  offset = [0, 0, 0],
}: TitleProps) {
  const [textMaterial] = useState(
    () => new THREE.MeshStandardMaterial({ roughness: 1 }),
  );
  const [splittedContent, firstPositionX] = useMemo(() => {
    const splittedContent = content.replaceAll(" ", "").split("");

    return [splittedContent, -(letterSpacing * (splittedContent.length / 2))];
  }, [content, letterSpacing]);

  return (
    <>
      {splittedContent.map((letter, index) => {
        const x = offset[0] + (firstPositionX + index * letterSpacing);
        const y = offset[1];
        const z = offset[2];

        return (
          <Letter
            key={`title-letter-${index}`}
            content={letter}
            material={textMaterial}
            position={[x, y, z]}
          />
        );
      })}
    </>
  );
}
