import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";
import { START_HEIGHT } from "@/resources/constants";

interface Experience {
  step: "loading" | "ready" | "following" | "falling" | "landed";
  cursorFallPosition: THREE.Vector3Like;

  loaded: () => void;
  follow: (clickPosition: THREE.Vector3) => void;
  fall: () => void;
  landed: () => void;
}

export default create(
  subscribeWithSelector<Experience>((set) => {
    return {
      step: "loading",
      cursorFallPosition: { x: 0, y: START_HEIGHT, z: 0 },

      loaded: () =>
        set((state) =>
          state.step === "loading"
            ? {
                step: "ready",
              }
            : {},
        ),

      follow: (clickPosition) =>
        set((state) =>
          state.step === "ready"
            ? {
                step: "following",
                cursorFallPosition: {
                  x: clickPosition.x,
                  y: START_HEIGHT,
                  z: clickPosition.z,
                },
              }
            : {},
        ),

      fall: () =>
        set((state) =>
          state.step === "following"
            ? {
                step: "falling",
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
