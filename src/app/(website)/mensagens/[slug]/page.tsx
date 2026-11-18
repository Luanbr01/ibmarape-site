import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/sanity/queries";
import { InternalHero } from "@/components/internal/InternalHero";
import { formatChurchDate, validExternalUrl } from "@/lib/internal-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const message = (await getMessages())?.find((item) => item.slug === slug);
  return { title: message ? `${message.title} | Igreja Batista do Marapé` : "Mensagem não encontrada" };
}

export default async function MessageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const message = (await getMessages())?.find((item) => item.slug === slug);
  if (!message) notFound();
  const videoUrl = validExternalUrl(message.videoUrl);
  const date = formatChurchDate(message.publishedAt);
  return (
    <main className="internal-page">
      <InternalHero eyebrow="MENSAGENS" title={message.title} backHref="/mensagens" backLabel="Todas as mensagens" />
      <article className="container internal-detail">
        {message.cover && <div className="internal-detail-image" role="img" aria-label={`Capa da mensagem ${message.title}`} style={{ backgroundImage: `url("${message.cover}")` }} />}
        <div className="internal-detail-copy">
          {(message.speaker || date) && <div className="internal-metadata">{message.speaker && <span>Pregador: {message.speaker}</span>}{date && <span>{date}</span>}</div>}
          {videoUrl ? (
            <a className="internal-primary-link" href={videoUrl} target="_blank" rel="noopener noreferrer">Assistir mensagem <span aria-hidden="true">↗</span></a>
          ) : <p>O vídeo desta mensagem ainda não foi disponibilizado.</p>}
          <Link href="/mensagens" className="internal-text-link">Ver outras mensagens <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </main>
  );
}
