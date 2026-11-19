"use client";

import { useEffect, useRef, useState } from "react";
import type { HistoryMilestone } from "@/sanity/queries";

type Props = { milestones: HistoryMilestone[] };

export function HistoryTimeline({ milestones }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const eventRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = eventRefs.current.filter((node): node is HTMLLIElement => !!node);
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const first = visible[0];
        if (first) {
          const index = Number((first.target as HTMLElement).dataset.milestoneIndex);
          if (Number.isInteger(index)) setActiveIndex(index);
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [milestones]);

  // Multiple milestones may share the same year. The navigation points to the first.
  const years = milestones.reduce<Array<{ year: number; index: number }>>((all, item, index) => {
    if (!all.some((entry) => entry.year === item.year)) {
      all.push({ year: item.year, index });
    }
    return all;
  }, []);

  const goToMilestone = (index: number) => {
    setActiveIndex(index);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    eventRefs.current[index]?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="history-timeline-layout">
      <nav className="history-year-nav" aria-label="Navegação por anos da história">
        <span className="history-year-nav-label">NAVEGUE PELOS ANOS</span>
        <div className="history-year-list">
          {years.map(({ year, index }) => (
            <button
              key={year}
              type="button"
              className={milestones[activeIndex]?.year === year ? "history-year-button is-active" : "history-year-button"}
              aria-current={milestones[activeIndex]?.year === year ? "step" : undefined}
              onClick={() => goToMilestone(index)}
            >
              {year}
            </button>
          ))}
        </div>
      </nav>

      <ol className="history-timeline" aria-label="Cronologia da Igreja Batista do Marapé">
        {milestones.map((event, index) => (
          <li
            className={`timeline-event ${index % 2 === 0 ? "left" : "right"}${activeIndex === index ? " is-active" : ""}`}
            key={event._id}
            data-reveal
            data-milestone-index={index}
            ref={(node) => { eventRefs.current[index] = node; }}
          >
            <div className="timeline-dot" aria-hidden="true" />
            <article className="timeline-card">
              <div className="timeline-year">{event.year}</div>
              {event.photo && (
                <div
                  className="timeline-photo"
                  style={{ backgroundImage: `url("${event.photo}")` }}
                  role="img"
                  aria-label={`Imagem de ${event.title}`}
                />
              )}
              <h3>{event.title}</h3>
              {event.description && <p>{event.description}</p>}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
