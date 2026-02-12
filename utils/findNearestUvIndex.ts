import * as THREE from "three";

export default function findNearestUvIndex(
  planeGeometry: THREE.PlaneGeometry,
  uv: THREE.Vector2,
) {
  const SEG_X = planeGeometry.parameters.widthSegments;
  const SEG_Y = planeGeometry.parameters.heightSegments;

  const u = THREE.MathUtils.clamp(uv.x, 0, 1);
  const v = THREE.MathUtils.clamp(1 - uv.y, 0, 1); // ✅ y 뒤집기

  const ix = Math.round(u * SEG_X);
  const iy = Math.round(v * SEG_Y);

  return iy * (SEG_X + 1) + ix;
}
