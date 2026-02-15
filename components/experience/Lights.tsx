import { Helper } from "@react-three/drei";
import * as THREE from "three";

export default function Lights() {
  return (
    <>
      <directionalLight
        castShadow
        args={["#ffffff", 2]}
        position={[6.2, 6.2, 4]}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera
          attach="shadow-camera"
          near={1}
          far={18.5}
          top={10}
          right={10}
          bottom={-8}
          left={-10}
        >
          <Helper type={THREE.CameraHelper} />
        </orthographicCamera>
      </directionalLight>

      <ambientLight intensity={2.5} />
    </>
  );
}
