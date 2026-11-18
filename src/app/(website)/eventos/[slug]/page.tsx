import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";
import { formatChurchDate, validExternalUrl } from "@/lib/internal-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = (await getEvents())?.find((item) => item.slug === slug);
  return { title: event ? `${event.title} | Igreja Batista do Marapé` : "Evento não encontrado" };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = (await getEvents())?.find((item) => item.slug === slug);
  if (!event) notFound();
  const date = formatChurchDate(event.startsAt, true);
  const url = validExternalUrl(event.registrationUrl);
  const past = event.startsAt && new Date(event.startsAt).getTime() < Date.now();
  return (
    <main className="internal-page">
      <InternalHero eyebrow="EVENTOS" title={event.title} backHref="/eventos" backLabel="Todos os eventos" />
      <article className="container internal-detail">
        {event.cover && <div className="internal-detail-image" role="img" aria-label={`Capa do evento ${event.title}`} style={{ backgroundImage: `url("${event.cover}")` }} />}
        <div className="internal-detail-copy">
          {date && <p className="internal-date"><span aria-hidden="true">◷</span> {date}</p>}
          {event.description && <div className="internal-prose"><p>{event.description}</p></div>}
          {url && !past && <a className="internal-primary-link" href={url} target="_blank" rel="noopener noreferrer">Acessar inscrição <span aria-hidden="true">↗</span></a>}
          {past && <p className="internal-muted">Este evento já aconteceu.</p>}
          <Link href="/eventos" className="internal-text-link">Ver programação <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </main>
  );
}
