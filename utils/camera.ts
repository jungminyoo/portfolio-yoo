import * as THREE from "three";

export function getCameraPosition(cursorPosition: THREE.Vector3Like) {
  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(cursorPosition);
  cameraPosition.x += 2;
  cameraPosition.z += 5;
  cameraPosition.y += 10;

  return cameraPosition;
}

export function getCameraQuaternion(
  from: THREE.Vector3Like,
  to: THREE.Vector3Like,
  up = new THREE.Vector3(0, 1, 0),
) {
  const fromVec = new THREE.Vector3().copy(from);
  const toVec = new THREE.Vector3().copy(to);

  const m = new THREE.Matrix4();
  m.lookAt(fromVec, toVec, up);

  const quaternion = new THREE.Quaternion();
  quaternion.setFromRotationMatrix(m);

  return quaternion;
}

export function getCameraPlaneTargetY(
  cameraPosition: THREE.Vector3Like,
  cameraQuaternion: THREE.QuaternionLike,
  planeY: number,
) {
  const origin = new THREE.Vector3().copy(cameraPosition);

  // Camera forward in three.js is -Z
  const direction = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(new THREE.Quaternion().copy(cameraQuaternion))
    .normalize();

  // Solve: origin.y + direction.y * t = planeY
  const t = (planeY - origin.y) / direction.y;

  return origin.add(direction.multiplyScalar(t));
}
