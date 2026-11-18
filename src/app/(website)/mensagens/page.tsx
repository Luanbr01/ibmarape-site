import type { Metadata } from "next";
import { getMessages } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";
import { ContentCard } from "@/components/internal/ContentCard";
import { EmptyContent } from "@/components/internal/EmptyContent";
import { formatChurchDate } from "@/lib/internal-content";

export const metadata: Metadata = { title: "Mensagens | Igreja Batista do Marapé", description: "Mensagens e pregações publicadas pela Igreja Batista do Marapé." };

export default async function MessagesPage() {
  const messages = (await getMessages()) || [];
  return (
    <main className="internal-page">
      <InternalHero eyebrow="PALAVRA" title="Mensagens" description="Mensagens para ouvir, refletir e compartilhar." />
      <section className="internal-section container" aria-label="Mensagens publicadas">
        {messages.length ? (
          <div className="internal-card-grid">
            {messages.map((message) => (
              <ContentCard key={message.slug} href={`/mensagens/${message.slug}`} title={message.title} cover={message.cover} eyebrow={[formatChurchDate(message.publishedAt), message.speaker].filter(Boolean).join(" · ")} action="Ver mensagem" />
            ))}
          </div>
        ) : <EmptyContent title="Mensagens em breve" description="As mensagens da igreja aparecerão aqui após serem publicadas no Sanity." />}
      </section>
    </main>
  );
}
