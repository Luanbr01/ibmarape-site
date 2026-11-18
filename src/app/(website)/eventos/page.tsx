import type { Metadata } from "next";
import { getEvents } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";
import { ContentCard } from "@/components/internal/ContentCard";
import { EmptyContent } from "@/components/internal/EmptyContent";
import { formatChurchDate } from "@/lib/internal-content";
import type { ChurchEvent } from "@/sanity/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Eventos | Igreja Batista do Marapé", description: "Acompanhe a programação publicada pela Igreja Batista do Marapé." };

function EventGrid({ events }: { events: ChurchEvent[] }) {
  return <div className="internal-card-grid">{events.map((event) => <ContentCard key={event.slug} href={`/eventos/${event.slug}`} title={event.title} cover={event.cover} eyebrow={formatChurchDate(event.startsAt, true)} description={event.description} action="Ver evento" />)}</div>;
}

export default async function EventsPage() {
  const events = (await getEvents()) || [];
  const now = Date.now();
  const upcoming = events.filter((event) => event.startsAt && new Date(event.startsAt).getTime() >= now);
  const previous = events.filter((event) => event.startsAt && new Date(event.startsAt).getTime() < now).reverse();
  const unscheduled = events.filter((event) => !event.startsAt || Number.isNaN(new Date(event.startsAt).getTime()));
  return (
    <main className="internal-page">
      <InternalHero eyebrow="PROGRAMAÇÃO" title="Eventos" description="Acompanhe o que está acontecendo na nossa comunidade." />
      <section className="internal-section container" aria-label="Programação de eventos">
        {events.length === 0 ? <EmptyContent title="Agenda em preparação" description="Os eventos serão exibidos aqui quando forem publicados pela equipe." /> : (
          <>
            {upcoming.length > 0 && <div className="internal-list-group"><h2 className="internal-group-title">Próximos eventos</h2><EventGrid events={upcoming} /></div>}
            {unscheduled.length > 0 && <div className="internal-list-group"><h2 className="internal-group-title">Outros eventos</h2><EventGrid events={unscheduled} /></div>}
            {previous.length > 0 && <div className="internal-list-group"><h2 className="internal-group-title">Eventos anteriores</h2><EventGrid events={previous} /></div>}
          </>
        )}
      </section>
    </main>
  );
}
