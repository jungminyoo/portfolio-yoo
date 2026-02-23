"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorCustom = useRef<HTMLDivElement>(null);
  const cursorFollower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent): void => {
      gsap.to(cursorFollower.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(cursorCustom.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    gsap.set(cursorFollower.current, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(cursorCustom.current, {
      xPercent: -50,
      yPercent: -50,
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="absolute max-lg:hidden z-10 top-0 left-0">
      <div
        ref={cursorFollower}
        className="w-12.5 h-12.5 rounded-full bg-transparent border-white border-2 border-solid fixed z-50 mix-blend-difference pointer-events-none"
      ></div>
      <div
        ref={cursorCustom}
        className="cursorCustom w-2.5 h-2.5 rounded-full bg-white fixed z-50 mix-blend-difference pointer-events-none"
      ></div>
    </div>
  );
}
