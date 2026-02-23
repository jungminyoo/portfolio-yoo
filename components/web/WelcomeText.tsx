import { ZenLoop } from "@/resources/fonts";

export default function WelcomeText() {
  return (
    <div
      className={`${ZenLoop.className} absolute text-center text-[6vh]/10 w-max top-7/12 left-1/2 -translate-x-1/2 z-9`}
    >
      Welcome to my portfolio!
      <br />
      <span className="text-[3.5vh]">&gt; Click anywhere to start &lt;</span>
    </div>
  );
}
