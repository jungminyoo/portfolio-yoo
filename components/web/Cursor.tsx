"use client";

import useExperience from "@/stores/useExperience";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const progress = useProgress((state) => state.progress);

  const step = useExperience((state) => state.step);
  const loaded = useExperience((state) => state.loaded);

  const cursorCustom = useRef<HTMLDivElement>(null);
  const cursorFollower = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (progress === 100)
      setTimeout(() => {
        gsap.to(cursorFollower.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(cursorCustom.current, {
          opacity: 100,
          duration: 0.5,
        });

        loaded();
      }, 1000);
  }, [progress]);

  useEffect(() => {
    if (step !== "ready") return;

    const moveCursor = (e: MouseEvent): void => {
      gsap.to(cursorFollower.current, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(cursorCustom.current, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
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
  }, [step]);

  return (
    <div
      className={`absolute z-10 top-1/2 left-1/2 -translate-1/2 w-12.5 h-12.5 ${step === "ready" && "max-lg:hidden"}`}
    >
      <svg
        ref={cursorFollower}
        className={`w-full h-full -rotate-90 fixed mix-blend-difference pointer-events-none scale-500`}
      >
        <circle
          className="transition-all duration-500 ease-out"
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="white"
          strokeWidth={step === "loading" ? 0.5 : 1}
          strokeLinecap="square"
          pathLength="99"
          strokeDasharray="100"
          strokeDashoffset={step === "loading" ? 100 - progress : 0}
        />
      </svg>

      <div
        ref={cursorCustom}
        className={`w-2.5 h-2.5 rounded-full bg-white fixed z-50 mix-blend-difference pointer-events-none opacity-0`}
      ></div>
    </div>
  );
}
