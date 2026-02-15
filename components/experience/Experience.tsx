import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Floor from "./Floor";
import Title from "./Title";
import Lights from "./Lights";
import Bound from "./Bound";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Lights />

      <Floor />
      <Title content="<Yoo/>" offset={[-0.3, 8, -0.2]} />
      <Title content="Web" size={0.35} offset={[-0.9, 8, 0.5]} />
      <Title content="Artist" size={0.35} offset={[0.6, 8, 0.5]} />

      <Bound />
    </>
  );
}
