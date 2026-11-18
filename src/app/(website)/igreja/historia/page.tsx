import type { Metadata } from "next";
import Link from "next/link";
import { getHistoryPage, getHistoryMilestones } from "@/sanity/queries";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "Nossa História | Igreja Batista do Marapé",
  description: "Conheça a trajetória da Igreja Batista do Marapé.",
};

export default async function HistoryPage() {
  const [page, milestones] = await Promise.all([
    getHistoryPage(),
    getHistoryMilestones(),
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {page?.cover && (
          <div
            className={styles.heroImage}
            role="img"
            aria-label={page.coverAlt || "Fotografia da história da igreja"}
            style={{ backgroundImage: `url("${page.cover}")` }}
          />
        )}
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>IGREJA BATISTA DO MARAPÉ</p>
          <h1>{page?.title || "Nossa História"}</h1>
          {page?.introduction && <p className={styles.intro}>{page.introduction}</p>}
          <a className={styles.explore} href="#linha-do-tempo">
            Explore nossa trajetória <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="linha-do-tempo" className={styles.timelineSection} aria-labelledby="timeline-heading">
        <div className={`container ${styles.timelineIntroduction}`}>
          <p className={styles.sectionLabel}>MEMÓRIAS E MARCOS</p>
          <h2 id="timeline-heading">Uma história construída ao longo do tempo<span className={styles.blue}>.</span></h2>
        </div>
        {milestones?.length ? (
          <HistoryTimeline milestones={milestones} />
        ) : (
          <div className={`container ${styles.empty}`}>
            <p>Estamos preparando os marcos da nossa história.</p>
            <p>Em breve, esta linha do tempo reunirá acontecimentos e fotografias da igreja.</p>
          </div>
        )}
      </section>

      <section className={styles.closing}>
        <div className="container">
          <p className={styles.sectionLabel}>CONTINUE EXPLORANDO</p>
          <h2>Conheça nossa comunidade<span className={styles.blue}>.</span></h2>
          <Link href="/ministerios" className={styles.closingLink}>
            Conheça os ministérios <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
