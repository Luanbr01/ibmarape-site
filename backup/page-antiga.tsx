import Link from "next/link";
import {Hero} from "@/components/Hero";
import {fallbackHome,sections} from "@/lib/content";
import {getHomeContent} from "@/sanity/queries";
export default async function Home(){
 const content=await getHomeContent();
 return <main>
 <Hero content={content}/>
 <section id="bem-vindo" className="section welcome"><div className="container split"><div className="section-copy" data-reveal><p className="eyebrow dark"><span/> BEM-VINDO</p><h2>{content?.welcomeTitle||fallbackHome.welcomeTitle}</h2><p className="short-copy">{content?.welcomeText||fallbackHome.welcomeText}</p><Link href="/igreja" className="text-link">Conheça a igreja <span>↗</span></Link></div><div className="photo welcome-photo" data-reveal aria-label="Imagem ilustrativa de comunidade"/></div></section>
 <section className="section ministries"><div className="container"><div className="section-heading" data-reveal><p className="eyebrow dark"><span/> COMUNIDADE</p><h2>Ministérios<span className="dot">.</span></h2><Link href="/ministerios" className="text-link">Ver todos <span>↗</span></Link></div><div className="ministry-grid">{sections.ministries.map(card=><Link key={card.title} className="ministry-card" href={card.href} data-reveal style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.65),transparent 58%),url('${card.image}')`}}><span>{card.title}</span><b aria-hidden="true">↗</b></Link>)}</div></div></section>
 <section className="section messages"><div className="container split message-grid"><div data-reveal><p className="eyebrow"><span/> CONTEÚDO</p><h2>Mensagens<span className="dot">.</span></h2><p className="short-copy">Palavra que edifica.</p><Link href="/mensagens" className="text-link light">Ver mensagens <span>↗</span></Link></div><Link href="/mensagens" className="photo message-photo" data-reveal aria-label="Ver mensagens"><span className="play-icon" aria-hidden="true">▶</span></Link></div></section>
 <section className="section events"><div className="container split"><div data-reveal><p className="eyebrow dark"><span/> AGENDA</p><h2>Eventos<span className="dot">.</span></h2><p className="short-copy">Acompanhe nossa programação.</p><Link href="/eventos" className="text-link">Ver eventos <span>↗</span></Link></div><Link href="/eventos" className="photo event-photo" data-reveal aria-label="Ver eventos"><span className="image-arrow">↗</span></Link></div></section>
 <section className="history"><div className="photo history-photo" aria-label="Imagem ilustrativa de arquitetura"/><div className="history-content" data-reveal><p className="eyebrow dark"><span/> IDENTIDADE</p><h2>Nossa história<span className="dot">.</span></h2><Link href="/igreja/historia" className="text-link">Conheça mais <span>↗</span></Link></div></section>
 <section className="final-invite"><div className="container" data-reveal><p className="eyebrow"><span/> IGREJA BATISTA DO MARAPÉ</p><h2>Venha conhecer.</h2><Link href="/contato" className="btn btn-outline">Entre em contato <span>↗</span></Link></div></section>
 </main>
}
