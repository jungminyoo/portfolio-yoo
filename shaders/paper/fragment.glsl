varying vec2 vUv;
varying float vInk;

void main() {
    vec3 base = vec3(1.0);
    float ink = pow(clamp(vInk, 0.0, 1.0), 0.6); // 0.6~0.8 정도 추천
    vec3 color = mix(base, vec3(0.0), ink);

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}