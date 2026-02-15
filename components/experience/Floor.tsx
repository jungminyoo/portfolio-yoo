import { FLOOR_SCALE } from "@/resources/constants";
import floorFragmentShaders from "@/shaders/floor/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const uniformData: THREE.WebGLProgramParametersWithUniforms["uniforms"] = {
  uTime: { value: 0 },
};

const floorMaterial = new THREE.MeshStandardMaterial({
  roughness: 1,
  metalness: 0.5,
});

floorMaterial.onBeforeCompile = (shaders) => {
  shaders.uniforms.uTime = uniformData.uTime;

  // Set USE_UV to activate uv varyings
  shaders.vertexShader = shaders.vertexShader.replace(
    "#define STANDARD",
    `
        #define STANDARD
        #define USE_UV
    `,
  );

  // Get vUv and uTime in fragment shader
  shaders.fragmentShader = shaders.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>

        uniform float uTime;
        varying vec2 vUv;
    `,
  );

  shaders.fragmentShader = shaders.fragmentShader.replace(
    "#include <map_fragment>",
    floorFragmentShaders,
  );
};

export default function Floor() {
  useFrame((state) => {
    uniformData.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <mesh
        receiveShadow
        material={floorMaterial}
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={FLOOR_SCALE}
      >
        <planeGeometry />
      </mesh>
    </>
  );
}
