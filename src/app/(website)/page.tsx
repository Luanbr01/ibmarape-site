import Link from "next/link";
import { Hero } from "@/components/Hero";
import { fallbackHome, sections } from "@/lib/content";
import { getHomeContent, getMinistries, getMessages, getEvents } from "@/sanity/queries";

const titleOr = (value: string | undefined, fallback: string) => value?.trim() || fallback;

export default async function Home() {
    const [content, ministries, messages, events] = await Promise.all([
        getHomeContent(), getMinistries(), getMessages(), getEvents(),
    ]);

    // As referências escolhidas no Studio têm prioridade; sem seleção, usa publicações recentes.
    // Um documento sem referências publicadas não deve produzir cards vazios.
    const selectedMinistries = (content?.featuredMinistries || []).filter(m => m?.title && m?.slug);
    const ministrySource = selectedMinistries.length ? selectedMinistries : (ministries || []).slice(0, 3);
    const ministryCards = ministrySource.length
        ? ministrySource.map(m => ({ title: m.title, image: m.cover || "", href: `/ministerios/${m.slug}` }))
        : sections.ministries;

    const message = content?.featuredMessage?.slug ? content.featuredMessage : messages?.[0];
    const featuredEvents = (content?.featuredEvents || []).filter(e => e?.slug);
    const nextEvent = (events || []).filter(e => e.startsAt && new Date(e.startsAt) >= new Date()).find(e => e.cover);
    const event = featuredEvents[0] || nextEvent;

    return (
        <main>
            <Hero content={content} />

            {content?.welcomeEnabled !== false && (
                <section id="bem-vindo" className="section welcome">
                    <div className="container split">
                        <div className="section-copy" data-reveal>
                            <p className="eyebrow dark"><span /> BEM-VINDO</p>
                            <h2>{titleOr(content?.welcomeTitle, fallbackHome.welcomeTitle)}</h2>
                            <p className="short-copy">{titleOr(content?.welcomeText, fallbackHome.welcomeText)}</p>
                            <Link href="/igreja" className="text-link">Conheça a igreja <span>↗</span></Link>
                        </div>
                        <div
                            className="photo welcome-photo"
                            style={content?.welcomePhoto ? { backgroundImage: `url("${content.welcomePhoto}")` } : undefined}
                            data-reveal
                            role="img"
                            aria-label="Fotografia da comunidade"
                        />
                    </div>
                </section>
            )}

            {content?.ministriesEnabled !== false && (
                <section className="section ministries">
                    <div className="container">
                        <div className="section-heading" data-reveal>
                            <p className="eyebrow dark"><span /> COMUNIDADE</p>
                            <h2>{titleOr(content?.ministriesTitle, "Ministérios")}<span className="dot">.</span></h2>
                            <Link href="/ministerios" className="text-link">Ver todos <span>↗</span></Link>
                        </div>
                        <div className="ministry-grid">
                            {ministryCards.map(card => (
                                <Link
                                    key={card.href}
                                    className="ministry-card"
                                    href={card.href}
                                    data-reveal
                                    style={card.image ? { backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.65),transparent 58%),url("${card.image}")` } : undefined}
                                >
                                    <span>{card.title}</span><b aria-hidden="true">↗</b>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {content?.messagesEnabled !== false && (
                <section className="section messages">
                    <div className="container split message-grid">
                        <div data-reveal>
                            <p className="eyebrow"><span /> CONTEÚDO</p>
                            <h2>{titleOr(content?.messagesTitle, "Mensagens")}<span className="dot">.</span></h2>
                            <p className="short-copy">{titleOr(content?.messagesText, "Palavra que edifica.")}</p>
                            <Link href="/mensagens" className="text-link light">Ver mensagens <span>↗</span></Link>
                        </div>
                        <Link
                            href={message?.slug ? `/mensagens/${message.slug}` : "/mensagens"}
                            className="photo message-photo"
                            style={message?.cover || content?.messagePhoto ? { backgroundImage: `url("${message?.cover || content?.messagePhoto}")` } : undefined}
                            data-reveal
                            aria-label={message?.title ? `Ver mensagem: ${message.title}` : "Ver mensagens"}
                        >
                            <span className="play-icon" aria-hidden="true">▶</span>
                        </Link>
                    </div>
                </section>
            )}

            {content?.eventsEnabled !== false && (
                <section className="section events">
                    <div className="container split">
                        <div data-reveal>
                            <p className="eyebrow dark"><span /> AGENDA</p>
                            <h2>{titleOr(content?.eventsTitle, "Eventos")}<span className="dot">.</span></h2>
                            <p className="short-copy">{titleOr(content?.eventsText, "Acompanhe nossa programação.")}</p>
                            <Link href="/eventos" className="text-link">Ver eventos <span>↗</span></Link>
                        </div>
                        <Link
                            href={event?.slug ? `/eventos/${event.slug}` : "/eventos"}
                            className="photo event-photo"
                            style={event?.cover || content?.eventPhoto ? { backgroundImage: `url("${event?.cover || content?.eventPhoto}")` } : undefined}
                            data-reveal
                            aria-label={event?.title ? `Ver evento: ${event.title}` : "Ver eventos"}
                        >
                            <span className="image-arrow" aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </section>
            )}

            {content?.historyEnabled !== false && (
                <section className="history">
                    <div
                        className="photo history-photo"
                        style={content?.historyPhoto ? { backgroundImage: `url("${content.historyPhoto}")` } : undefined}
                        role="img"
                        aria-label="Fotografia da história da igreja"
                    />
                    <div className="history-content" data-reveal>
                        <p className="eyebrow dark"><span /> IDENTIDADE</p>
                        <h2>{titleOr(content?.historyTitle, "Nossa história")}<span className="dot">.</span></h2>
                        <Link href="/igreja/historia" className="text-link">Conheça mais <span>↗</span></Link>
                    </div>
                </section>
            )}

            {content?.finalEnabled !== false && (
                <section
                    className="final-invite"
                    style={content?.finalPhoto ? { backgroundImage: `linear-gradient(90deg,#17232be8,#16212f85),url("${content.finalPhoto}")` } : undefined}
                >
                    <div className="container" data-reveal>
                        <p className="eyebrow"><span /> IGREJA BATISTA DO MARAPÉ</p>
                        <h2>{titleOr(content?.finalTitle, "Venha conhecer.")}</h2>
                        <Link href="/contato" className="btn btn-outline">Entre em contato <span>↗</span></Link>
                    </div>
                </section>
            )}
        </main>
    );
}
