"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fallbackHome } from "@/lib/content";
import type { HomeContent } from "@/sanity/queries";
export function Hero({ content }: {
    content: HomeContent | null;
}) {
    const [videoFailed, setVideoFailed] = useState(false);
    const title = content?.title || fallbackHome.title;
    const poster = content?.heroPoster || fallbackHome.heroPoster;
    // Se o documento do Sanity existe, respeitar o campo vazio (apenas imagem).
    // Sem documento publicado, preservar o vídeo local de demonstração.
    const video = content ? content.heroVideo : fallbackHome.heroVideo;
    useEffect(() => setVideoFailed(false), [video]);
    return <section className="hero" aria-labelledby="hero-title">
  <div className="hero-media" style={{ backgroundImage: `linear-gradient(90deg,rgba(11,19,27,.77),rgba(15,19,25,.25)),url('${poster}')` }}>
   {video && !videoFailed && <video key={video} className="hero-video" autoPlay muted loop playsInline preload="none" poster={poster} aria-hidden="true" onError={() => setVideoFailed(true)}><source src={video} type="video/mp4"/></video>}
  </div><div className="hero-overlay"/>
  <div className="container hero-content"><div className="eyebrow hero-eyebrow"><span /> IGREJA BATISTA DO MARAPÉ</div><h1 id="hero-title">{title}</h1><Link href="/igreja" className="btn btn-outline">Conheça a igreja <span>↗</span></Link></div>
  <a className="hero-scroll" href="#bem-vindo" aria-label="Ir para próxima seção">ROLE PARA EXPLORAR <span>↓</span></a>
 </section>;
}
