export const FLOOR_SCALE: [x: number, y: number, z: number] = [42, 18, 1];
export const START_HEIGHT = 16;
export const START_CAMERA_HEIGHT = 40;
export const BOUND_THICKNESS = 2;
export const BOUND_HEIGHT = 6;
export const BOUND_HEIGHT_OFFSET = 0.5;
export const MOUSE_THRESHOLD = 2;

export const KEYBOARD_MAP = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

export const FLAT_KEYBOARD_MAP = KEYBOARD_MAP.reduce<string[]>(
  (acc, map) => [...acc, ...map.keys],
  [],
);
