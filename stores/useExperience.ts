import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface Experience {
  is3D: boolean;
  to3D: () => void;
}

export default create(
  subscribeWithSelector<Experience>((set) => {
    return {
      is3D: false,

      to3D: () => set((state) => (state.is3D === false ? { is3D: true } : {})),
    };
  }),
);
