import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Floor from "./maps/Floor";
import Title from "./objects/Title";
import Lights from "./environments/Lights";
import Bound from "./maps/Bound";
import useExperience from "@/stores/useExperience";
import Player from "./objects/Player";
import FakePlane from "./maps/FakePlane";
import { FLAT_KEYBOARD_MAP, START_HEIGHT } from "@/resources/constants";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { updateMousePosition } from "@/stores/useMouse";
import Environments from "./environments/Environments";

export default function Experience() {
  const domElement = useThree((three) => three.gl.domElement);

  const step = useExperience((state) => state.step);

  useEffect(() => {
    const enterPointerLock = () => domElement.requestPointerLock();
    const leavePointerLock = (event: MouseEvent) =>
      event.button === 2 && document.exitPointerLock();

    const resetKeys = () => {
      if (document.pointerLockElement !== domElement)
        FLAT_KEYBOARD_MAP.forEach((code) => {
          window.dispatchEvent(new KeyboardEvent("keyup", { code }));
        });
    };

    domElement.addEventListener("click", enterPointerLock);
    domElement.addEventListener("mousedown", leavePointerLock);
    document.addEventListener("pointerlockchange", resetKeys);
    domElement.addEventListener("mousemove", updateMousePosition);

    return () => {
      domElement.removeEventListener("click", enterPointerLock);
      domElement.removeEventListener("mousedown", leavePointerLock);
      document.removeEventListener("pointerlockchange", resetKeys);
      domElement.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Lights />
      <Environments />

      <Floor />
      <Title content="<Yoo/>" size={1.5} offset={[-0.5, START_HEIGHT, -0.2]} />
      <Title content="Web" size={0.5} offset={[-1.2, START_HEIGHT, 0.5]} />
      <Title content="Artist" size={0.5} offset={[0.5, START_HEIGHT, 0.5]} />

      {(step === "loading" || step === "ready") && <FakePlane />}
      {step !== "loading" && step !== "ready" && <Player />}

      <Bound />
    </>
  );
}
