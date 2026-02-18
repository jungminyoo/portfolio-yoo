import * as THREE from "three";

export default function getCameraPosition(cursorPosition: THREE.Vector3Like) {
  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(cursorPosition);
  cameraPosition.x += 5;
  cameraPosition.z += 5;
  cameraPosition.y += 10;

  return cameraPosition;
}
