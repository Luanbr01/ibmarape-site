import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMinistries } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ministry = (await getMinistries())?.find((item) => item.slug === slug);
  return { title: ministry ? `${ministry.title} | Igreja Batista do Marapé` : "Ministério não encontrado" };
}

export default async function MinistryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = (await getMinistries())?.find((item) => item.slug === slug);
  if (!ministry) notFound();
  return (
    <main className="internal-page">
      <InternalHero eyebrow="MINISTÉRIOS" title={ministry.title} backHref="/ministerios" backLabel="Todos os ministérios" />
      <article className="container internal-detail">
        {ministry.cover && <div className="internal-detail-image" role="img" aria-label={`Fotografia de ${ministry.title}`} style={{ backgroundImage: `url("${ministry.cover}")` }} />}
        <div className="internal-detail-copy">
          {ministry.summary && <p className="internal-intro">{ministry.summary}</p>}
          {ministry.descriptionText && <div className="internal-prose">{ministry.descriptionText.split(/\n+/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
          {!ministry.summary && !ministry.descriptionText && <p>Mais informações sobre este ministério serão publicadas em breve.</p>}
          <Link href="/ministerios" className="internal-text-link">Conheça outros ministérios <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </main>
  );
}
