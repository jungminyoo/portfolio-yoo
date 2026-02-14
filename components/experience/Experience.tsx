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
      <Title content="<Yoo/>" offset={[0, 1, 0]} />

      <Bound />
    </>
  );
}
