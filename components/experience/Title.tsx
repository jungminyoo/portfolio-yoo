import { useMemo, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Letter from "./Letter";

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
  const [textMaterial] = useState(
    () => new THREE.MeshStandardMaterial({ roughness: 1 }),
  );

  // ✅ Text3D와 동일한 폰트를 Title에서도 로드
  const font = useLoader(FontLoader, "./fonts/pretendard/pretendard_bold.json");

  const { splittedContent, xPositions } = useMemo(() => {
    const splittedContent = content.replaceAll(" ", "").split("");
    const n = splittedContent.length;

    if (n === 0) return { splittedContent, xPositions: [] as number[] };

    // 1) 글자별 실제 폭 측정
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

    // 2) 전체 폭(글자 폭 합 + 간격 합) 기준으로 가운데 정렬
    const totalWidth =
      widths.reduce((a, b) => a + b, 0) + letterSpacing * Math.max(0, n - 1);

    const startX = -totalWidth / 2;

    // 3) 누적 배치: (이전 글자 폭/2) + spacing + (현재 글자 폭/2)
    const xPositions: number[] = new Array(n);
    let cursor = startX;

    for (let i = 0; i < n; i++) {
      cursor += widths[i] / 2;
      xPositions[i] = cursor;
      cursor += widths[i] / 2 + letterSpacing;
    }

    return { splittedContent, xPositions };
  }, [content, letterSpacing, font, size, height]);

  // ✅ 여기서부터가 요청하신 "그 부분" 교체 버전입니다.
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
            material={textMaterial}
            position={[x, y, z]}
          />
        );
      })}
    </>
  );
}
