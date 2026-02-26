import { ZenLoop } from "@/resources/fonts";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Guide() {
  const guide = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(guide.current, {
      x: 0,
      duration: 2,
    });
  }, []);

  return (
    <>
      <div
        ref={guide}
        className={`${ZenLoop.className} absolute bottom-3 right-3 px-4 py-2 transition-transform bg-gray-700/70 text-white translate-x-96`}
      >
        <p className="text-right text-2xl">
          <b>Left Click</b>: Enter
          <br />
          <b>Right Click / ESC</b>: Leave
          <br />
          <b>WASD / &uarr;&larr;&darr;&rarr; / Mouse</b>: Move
        </p>
      </div>
    </>
  );
}
