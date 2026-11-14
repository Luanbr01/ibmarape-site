"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type MotionProviderProps = {
    duration: number;
    distance: number;
};

export function MotionProvider({ duration, distance }: MotionProviderProps) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Cada animação usa os valores publicados no Sanity.
        const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const context = gsap.context(() => {
            elements.forEach((element) => {
                gsap.fromTo(
                    element,
                    { opacity: 0, y: distance },
                    {
                        opacity: 1,
                        y: 0,
                        duration,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            });
        });
        ScrollTrigger.refresh();

        return () => {
            context.revert();
            gsap.ticker.remove(tick);
            lenis.off("scroll", onScroll);
            lenis.destroy();
        };
    }, [duration, distance]);

    return null;
}
