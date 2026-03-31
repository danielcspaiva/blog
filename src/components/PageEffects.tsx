"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const animateElements = document.querySelectorAll<HTMLElement>(".animate");

    animateElements.forEach((element, index) => {
      window.setTimeout(() => {
        element.classList.add("show");
      }, index * 100);
    });

    const onScroll = () => {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 0);
    };

    onScroll();
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
