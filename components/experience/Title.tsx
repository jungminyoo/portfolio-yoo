import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Letter from "./Letter";
import { mainMaterial } from "@/resources/materials";

interface TitleProps {
  content: string;
  size?: number;
  height?: number;
  letterSpacing?: number;
  offset?: [x: number, y: number, z: number];
}

export default function Title({
  content,
  size = 1,
  height = 0.5,
  letterSpacing = 0.1,
  offset = [0, 0, 0],
}: TitleProps) {
  const font = useLoader(FontLoader, "./fonts/pretendard/pretendard_bold.json");

  const { splittedContent, xPositions } = useMemo(() => {
    const splittedContent = content.replaceAll(" ", "").split("");
    const n = splittedContent.length;

    if (n === 0) return { splittedContent, xPositions: [] as number[] };

    const widths = splittedContent.map((ch) => {
      const geo = new TextGeometry(ch, {
        font,
        size,
        depth: height,
      });
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const w = bb.max.x - bb.min.x;
      geo.dispose();
      return w;
    });

    const totalWidth =
      widths.reduce((a, b) => a + b, 0) + letterSpacing * Math.max(0, n - 1);

    const startX = -totalWidth / 2;

    const xPositions: number[] = new Array(n);
    let cursor = startX;

    for (let i = 0; i < n; i++) {
      cursor += widths[i] / 2;
      xPositions[i] = cursor;
      cursor += widths[i] / 2 + letterSpacing;
    }

    return { splittedContent, xPositions };
  }, [content, letterSpacing, font, size, height]);

  return (
    <>
      {splittedContent.map((letter, index) => {
        const x = offset[0] + (xPositions[index] ?? 0);
        const y = offset[1];
        const z = offset[2];

        return (
          <Letter
            key={`title-letter-${index}`}
            content={letter}
            size={size}
            material={mainMaterial}
            position={[x, y, z]}
          />
        );
      })}
    </>
  );
}
