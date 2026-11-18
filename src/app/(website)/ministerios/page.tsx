import type { Metadata } from "next";
import { getMinistries } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";
import { ContentCard } from "@/components/internal/ContentCard";
import { EmptyContent } from "@/components/internal/EmptyContent";

export const metadata: Metadata = { title: "Ministérios | Igreja Batista do Marapé", description: "Conheça os ministérios da Igreja Batista do Marapé." };

export default async function MinistriesPage() {
  const ministries = (await getMinistries()) || [];
  return (
    <main className="internal-page">
      <InternalHero eyebrow="COMUNIDADE" title="Ministérios" description="Conheça as diferentes áreas de atuação da nossa comunidade." />
      <section className="internal-section container" aria-label="Ministérios publicados">
        {ministries.length > 0 ? (
          <div className="internal-card-grid">
            {ministries.map((ministry) => (
              <ContentCard key={ministry.slug} href={`/ministerios/${ministry.slug}`} title={ministry.title} description={ministry.summary} cover={ministry.cover} action="Conhecer ministério" />
            ))}
          </div>
        ) : <EmptyContent title="Ministérios em breve" description="As informações dos ministérios serão publicadas aqui pela equipe da igreja." />}
      </section>
    </main>
  );
}
