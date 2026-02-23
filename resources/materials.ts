import * as THREE from "three";
import floorFragmentShaders from "@/shaders/floor/fragment.glsl";

export const mainMaterial = new THREE.MeshStandardMaterial({ roughness: 1 });

export const floorMaterial = new THREE.MeshStandardMaterial({
  roughness: 1,
  metalness: 0.5,
});

export const floorEnvironmentMaterial = new THREE.MeshStandardMaterial({
  roughness: 1,
  metalness: 0.5,
});

export const floorUniformData: THREE.WebGLProgramParametersWithUniforms["uniforms"] =
  {
    uTime: { value: 0 },
    uIntensity: { value: 1 },
  };

export const floorEnvironmentUniformData: THREE.WebGLProgramParametersWithUniforms["uniforms"] =
  {
    uTime: { value: 0 },
    uIntensity: { value: 2 },
  };

const applyFloorShaders = (
  shaders: THREE.WebGLProgramParametersWithUniforms,
) => {
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
        uniform float uIntensity;
        varying vec2 vUv;
    `,
  );

  shaders.fragmentShader = shaders.fragmentShader.replace(
    "#include <map_fragment>",
    floorFragmentShaders,
  );
};

floorMaterial.onBeforeCompile = (shaders) => {
  shaders.uniforms.uTime = floorUniformData.uTime;
  shaders.uniforms.uIntensity = floorUniformData.uIntensity;

  applyFloorShaders(shaders);
};

floorEnvironmentMaterial.onBeforeCompile = (shaders) => {
  shaders.uniforms.uTime = floorEnvironmentUniformData.uTime;
  shaders.uniforms.uIntensity = floorEnvironmentUniformData.uIntensity;

  applyFloorShaders(shaders);
};
