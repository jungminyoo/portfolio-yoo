import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";
import { START_HEIGHT } from "@/resources/constants";

interface Experience {
  step: "ready" | "falling" | "landed";
  cursorFallPosition: [x: number, y: number, z: number];
  fall: (clickPosition: THREE.Vector3) => void;
  landed: () => void;
}

export default create(
  subscribeWithSelector<Experience>((set) => {
    return {
      step: "ready",
      cursorFallPosition: [0, START_HEIGHT, 0],

      fall: (clickPosition) =>
        set((state) =>
          state.step === "ready"
            ? {
                step: "falling",
                cursorFallPosition: [
                  clickPosition.x,
                  START_HEIGHT,
                  clickPosition.z,
                ],
              }
            : {},
        ),

      landed: () =>
        set((state) =>
          state.step === "falling"
            ? {
                step: "landed",
              }
            : {},
        ),
    };
  }),
);
