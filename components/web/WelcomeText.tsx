import { ZenLoop } from "@/resources/fonts";

export default function WelcomeText() {
  return (
    <>
      <p
        className={`${ZenLoop.className} text-[6vh] absolute text-center w-max top-17/30 left-1/2 -translate-x-1/2 z-9 pointer-events-none`}
      >
        Welcome to my portfolio!
      </p>
      <p
        className={`${ZenLoop.className} text-[3.5vh] absolute text-center w-max top-19/30 left-1/2 -translate-x-1/2 z-9 pointer-events-none`}
      >
        &gt; Click anywhere to start &lt;
      </p>
    </>
  );
}
