import { MOUSE_THRESHOLD } from "@/resources/constants";
import { create } from "zustand";

interface Mouse {
  mouseForward: boolean;
  mouseRightward: boolean;
  mouseBackward: boolean;
  mouseLeftward: boolean;

  setMouseState: (mouseState: Omit<Mouse, "setMouseState">) => void;
}

const useMouse = create<Mouse>((set) => {
  return {
    mouseForward: false,
    mouseRightward: false,
    mouseBackward: false,
    mouseLeftward: false,

    setMouseState: (mouseState) => set(() => ({ ...mouseState })),
  };
});

let resetTimer: number | null = null;

export const updateMousePosition = (event: MouseEvent) => {
  const { movementX, movementY } = event;
  const { setMouseState } = useMouse.getState();

  setMouseState({
    mouseForward: movementY < -MOUSE_THRESHOLD,
    mouseRightward: movementX > MOUSE_THRESHOLD,
    mouseBackward: movementY > MOUSE_THRESHOLD,
    mouseLeftward: movementX < -MOUSE_THRESHOLD,
  });

  if (resetTimer) window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => {
    useMouse.getState().setMouseState({
      mouseForward: false,
      mouseRightward: false,
      mouseBackward: false,
      mouseLeftward: false,
    });
  }, 80);
};

export default useMouse;
