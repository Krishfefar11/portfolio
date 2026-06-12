"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds: string[], offset = 100): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: `-${offset}px 0px -60% 0px`,
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
}
