import { ZenLoop } from "@/resources/fonts";

export default function WelcomeText() {
  return (
    <>
      <p
        className={`${ZenLoop.className} landscape:text-[6vh] portrait:text-[5.5vw] top-17/30 absolute text-center w-max left-1/2 -translate-x-1/2 z-9 pointer-events-none`}
      >
        Welcome to my portfolio!
      </p>
      <p
        className={`${ZenLoop.className} landscape:text-[3.5vh] portrait:text-[3vw] top-19/30 absolute text-center w-max left-1/2 -translate-x-1/2 z-9 pointer-events-none`}
      >
        &gt; Click anywhere to start &lt;
      </p>
    </>
  );
}
