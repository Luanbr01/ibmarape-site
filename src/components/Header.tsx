"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const links = [{ label: "A Igreja", href: "/igreja" }, { label: "Ministérios", href: "/ministerios" }, { label: "Mensagens", href: "/mensagens" }, { label: "Eventos", href: "/eventos" }, { label: "Contato", href: "/contato" }];
export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => { const fn = () => setScrolled(window.scrollY > 36); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
    useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
    useEffect(() => { const fn = (event: KeyboardEvent) => { if (event.key === "Escape")
        setOpen(false); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, []);
    return <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
  <div className="header-inner container"><Link href="/" className="brand" aria-label="Igreja Batista do Marapé — início" onClick={() => setOpen(false)}><img src="/logo-completo-branco.png" alt="Igreja Batista do Marapé"/></Link>
  <nav className="desktop-nav" aria-label="Menu principal">{links.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link className="live-link" href="/ao-vivo"><span aria-hidden="true" className="live-dot"/>Ao vivo</Link></nav>
  <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}><span />{open ? <span className="menu-close">×</span> : <span />}</button></div>
  <nav id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Menu mobile" aria-hidden={!open}>{links.map(item => <Link tabIndex={open ? 0 : -1} key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></Link>)}<Link tabIndex={open ? 0 : -1} href="/ao-vivo" onClick={() => setOpen(false)}>Ao vivo <span>↗</span></Link></nav>
 </header>;
}
