import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Floor from "./Floor";
import Title from "./Title";
import Lights from "./Lights";
import Bound from "./Bound";
import useExperience from "@/stores/useExperience";
import Player from "./Player";
import FakePlane from "./FakePlane";
import { FLAT_KEYBOARD_MAP, START_HEIGHT } from "@/resources/constants";
import StartText from "./StartText";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { updateMousePosition } from "@/stores/useMouse";

export default function Experience() {
  const domElement = useThree((three) => three.gl.domElement);

  const step = useExperience((state) => state.step);

  useEffect(() => {
    const enterPointerLock = () => domElement.requestPointerLock();
    const resetKeys = () => {
      if (document.pointerLockElement !== domElement)
        FLAT_KEYBOARD_MAP.forEach((code) => {
          window.dispatchEvent(new KeyboardEvent("keyup", { code }));
        });
    };

    domElement.addEventListener("click", enterPointerLock);
    document.addEventListener("pointerlockchange", resetKeys);
    domElement.addEventListener("mousemove", updateMousePosition);

    return () => {
      domElement.removeEventListener("click", enterPointerLock);
      document.removeEventListener("pointerlockchange", resetKeys);
      domElement.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Lights />

      <Floor />
      <Title content="<Yoo/>" size={1.5} offset={[0, START_HEIGHT, -0.2]} />
      <Title content="Web" size={0.5} offset={[-0.75, START_HEIGHT, 0.5]} />
      <Title content="Artist" size={0.5} offset={[0.95, START_HEIGHT, 0.5]} />

      {step === "ready" && (
        <>
          <StartText />
          <FakePlane />
        </>
      )}
      {step !== "ready" && <Player />}

      <Bound />
    </>
  );
}
