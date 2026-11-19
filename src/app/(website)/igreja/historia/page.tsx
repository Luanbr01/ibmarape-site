import type { Metadata } from "next";
import Link from "next/link";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { getHistoryMilestones, getHistoryPage } from "@/sanity/queries";

export const metadata: Metadata = { title: "Nossa História | Igreja Batista do Marapé" };

export default async function HistoryPage() {
  const [page, timeline] = await Promise.all([getHistoryPage(), getHistoryMilestones()]);
  const milestones = timeline ?? [];

  return (
    <main className="history-page">
      <section className="history-hero">
        {page?.cover && <div className="history-hero-image" style={{ backgroundImage: `url("${page.cover}")` }} aria-hidden="true" />}
        <div className="container history-hero-content" data-reveal>
          <p className="eyebrow"><span />{page?.eyebrow || "NOSSA HISTÓRIA"}</p>
          <h1>{page?.title || "Uma história de fé."}</h1>
          {page?.introduction && <p className="history-intro">{page.introduction}</p>}
          <a href="#linha-do-tempo" className="btn btn-outline">Explore nossa trajetória <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="history-timeline-section" id="linha-do-tempo">
        <div className="container">
          <p className="eyebrow dark" data-reveal><span /> NOSSA TRAJETÓRIA</p>
          <h2 className="history-section-title" data-reveal>Linha do tempo<span className="dot">.</span></h2>
          {milestones.length === 0 ? (
            <div className="timeline-empty" data-reveal>
              <p>A linha do tempo está sendo preparada.</p>
              <p>Os acontecimentos e fotografias serão publicados pela equipe da igreja.</p>
            </div>
          ) : (
            <HistoryTimeline milestones={milestones} />
          )}
        </div>
      </section>
      <section className="history-bottom">
        <div className="container" data-reveal>
          <h2>Nossa caminhada continua.</h2>
          <Link href="/igreja" className="btn btn-outline">Conheça a igreja <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
