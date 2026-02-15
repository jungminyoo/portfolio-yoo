import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Floor from "./Floor";
import Title from "./Title";
import Lights from "./Lights";
import Bound from "./Bound";
import useExperience from "@/stores/useExperience";
import Player from "./Player";
import FakePlane from "./FakePlane";
import { START_HEIGHT } from "@/resources/constants";

export default function Experience() {
  const step = useExperience((state) => state.step);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Lights />

      <Floor />
      <Title content="<Yoo/>" offset={[-0.3, START_HEIGHT, -0.2]} />
      <Title content="Web" size={0.35} offset={[-0.9, START_HEIGHT, 0.5]} />
      <Title content="Artist" size={0.35} offset={[0.6, START_HEIGHT, 0.5]} />

      {step === "ready" && <FakePlane />}
      {step !== "ready" && <Player />}

      <Bound />
    </>
  );
}
