import { ZenLoop } from "@/resources/fonts";
import useExperience from "@/stores/useExperience";
import { useProgress } from "@react-three/drei";

export default function Loading() {
  const progress = useProgress((state) => state.progress);

  const step = useExperience((state) => state.step);

  return (
    <div
      className={`${ZenLoop.className} absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center transition-opacity duration-500 ${step === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <span className="text-[9vh] text-center">{progress} %</span>
    </div>
  );
}
