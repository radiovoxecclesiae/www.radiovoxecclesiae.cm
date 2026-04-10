'use client';

import { useEffect, useRef } from 'react';

interface SectionDot {
  id: string;
  label: string;
}

interface ScrollDotsProps {
  sections: SectionDot[];
}

export default function ScrollDots({ sections }: ScrollDotsProps) {
  const dotsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const sectionEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sectionEls.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: [0, 0.15, 0.5] }
    );

    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeId = entry.target.id;
          dotsRef.current.forEach((dot) => {
            const isActive = dot.getAttribute('data-target') === activeId;
            dot.classList.toggle('active', isActive);
          });
        });
      },
      { threshold: 0.5 }
    );

    requestAnimationFrame(() => {
      sectionEls.forEach((section) => {
        revealObserver.observe(section);
        dotObserver.observe(section);
      });
    });

    if (dotsRef.current[0]) dotsRef.current[0].classList.add('active');

    return () => {
      revealObserver.disconnect();
      dotObserver.disconnect();
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="scroll-dots" aria-label="Navigation par sections">
      {sections.map(({ id, label }, i) => (
        <button
          key={id}
          className="scroll-dot"
          aria-label={label}
          data-target={id}
          ref={(el) => { if (el) dotsRef.current[i] = el; }}
          onClick={() => handleClick(id)}
        />
      ))}
    </nav>
  );
}
