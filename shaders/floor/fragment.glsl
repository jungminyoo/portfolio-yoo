float angle = radians(120.0);
vec2 direction = vec2(cos(angle), sin(angle));
vec2 centered = vUv - 0.5;

float t = dot(centered, direction);
t *= 0.2;
float wave = sin(uTime * 0.6) * 0.5;
t += wave;
t = t + 0.5;
t = clamp(t, 0.0, 1.0);

vec3 colA = mix(vec3(0.67,0.06,0.70), vec3(0.30,0.38,0.65), t*2.0);
vec3 colB = mix(vec3(0.30,0.38,0.65), vec3(0.10,0.60,0.62), (t-0.5)*2.0);

float mask = step(0.5, t);

vec3 finalColor = mix(colA, colB, mask);

diffuseColor.rgb = finalColor;