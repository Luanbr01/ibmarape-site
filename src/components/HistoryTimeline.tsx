"use client";

import { useEffect, useRef, useState } from "react";
import type { HistoryMilestone } from "@/sanity/queries";
import styles from "@/app/(website)/igreja/historia/history.module.css";

type Props = { milestones: HistoryMilestone[] };

export function HistoryTimeline({ milestones }: Props) {
  const [active, setActive] = useState(0);
  const entryRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
          const index = Number((visible[0].target as HTMLElement).dataset.historyIndex);
          if (Number.isInteger(index)) setActive(index);
        }
      },
      { rootMargin: "-25% 0px -35% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );
    entryRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [milestones.length]);

  const goTo = (index: number) => {
    setActive(index);
    entryRefs.current[index]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className={`container ${styles.timelineLayout}`}>
      <aside className={styles.yearNavigation} aria-label="Navegar pelos marcos históricos">
        <p>ANOS</p>
        <div className={styles.yearList}>
          {milestones.map((milestone, index) => (
            <button
              key={milestone._id}
              type="button"
              className={index === active ? styles.yearActive : styles.yearButton}
              aria-current={index === active ? "step" : undefined}
              onClick={() => goTo(index)}
            >
              {milestone.year}
            </button>
          ))}
        </div>
      </aside>
      <div className={styles.entries}>
        <div className={styles.spine} aria-hidden="true" />
        {milestones.map((milestone, index) => (
          <article
            key={milestone._id}
            ref={(node) => { entryRefs.current[index] = node; }}
            data-history-index={index}
            data-reveal
            className={`${styles.entry} ${index % 2 ? styles.entryRight : styles.entryLeft}`}
          >
            <div className={styles.marker} aria-hidden="true" />
            <div className={styles.entryContent}>
              <div className={styles.yearDisplay}>{milestone.year}</div>
              {milestone.image && (
                <figure className={styles.figure}>
                  <img src={milestone.image} alt={milestone.imageAlt || milestone.title} loading="lazy" />
                  {milestone.imageCaption && <figcaption>{milestone.imageCaption}</figcaption>}
                </figure>
              )}
              <h3>{milestone.title}</h3>
              {milestone.description && <p>{milestone.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
