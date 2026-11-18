import type { Metadata } from "next";
import Link from "next/link";
import { getYoutubeLiveStatus } from "@/lib/youtube-live";

export const metadata: Metadata = { title: "Ao Vivo | Igreja Batista do Marapé" };

export default async function LivePage() {
  const status = await getYoutubeLiveStatus();
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim();
  return <main className="internal-page">
    <section className="internal-hero"><div className="container">
      <p className="eyebrow"><span /> TRANSMISSÃO</p>
      <h1>Ao vivo<span className="dot">.</span></h1>
      <p className="internal-lead">Acompanhe as transmissões da Igreja Batista do Marapé.</p>
    </div></section>
    <section className="section live-page-content"><div className="container">
      {status.live && status.videoId ? (
        <div className="live-player">
          <iframe title="Transmissão ao vivo da Igreja Batista do Marapé" src={`https://www.youtube-nocookie.com/embed/${status.videoId}?autoplay=0`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      ) : (
        <div className="live-offline">
          <span className="live-status-neutral" aria-hidden="true" />
          <h2>Nenhuma transmissão confirmada neste momento.</h2>
          <p>Quando houver uma transmissão pública identificada pelo YouTube, ela aparecerá nesta página.</p>
          {channelId && <a href={`https://www.youtube.com/channel/${encodeURIComponent(channelId)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Acessar canal no YouTube <span aria-hidden="true">↗</span></a>}
          {!channelId && <Link href="/mensagens" className="btn btn-outline">Ver mensagens <span aria-hidden="true">↗</span></Link>}
        </div>
      )}
    </div></section>
  </main>;
}
