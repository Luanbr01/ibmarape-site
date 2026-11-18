import type { Metadata } from "next";
import { getBulletins } from "@/sanity/queries";

export const metadata: Metadata = { title: "Boletim | Igreja Batista do Marapé" };

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "long", year: "numeric" }).format(date);
}

export default async function BulletinPage() {
  const bulletins = (await getBulletins() ?? []).filter(item => item.fileUrl);
  return (
    <main className="internal-page">
      <section className="internal-hero"><div className="container">
        <p className="eyebrow"><span /> PUBLICAÇÕES</p>
        <h1>Boletim<span className="dot">.</span></h1>
        <p className="internal-lead">Acompanhe os boletins publicados pela igreja.</p>
      </div></section>
      <section className="section bulletin-section"><div className="container">
        {!bulletins.length ? (
          <p className="bulletin-empty">Nenhum boletim publicado até o momento.</p>
        ) : (
          <div className="bulletin-grid">
            {bulletins.map(item => (
              <article className="bulletin-card" data-reveal key={item._id}>
                {item.cover && <div className="bulletin-cover" style={{backgroundImage:`url("${item.cover}")`}} role="img" aria-label={`Capa de ${item.title}`} />}
                <p className="bulletin-date">{formatDate(item.publishedAt)}</p>
                <h2>{item.title}</h2>
                {item.summary && <p>{item.summary}</p>}
                <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-link">Abrir boletim em PDF <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        )}
      </div></section>
    </main>
  );
}
