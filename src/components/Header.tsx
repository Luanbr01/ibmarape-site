"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const links = [
  { label: "O que Cremos", href: "/igreja/declaracao-doutrinaria" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Boletim", href: "/boletim" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    let active = true;
    const checkLive = async () => {
      try {
        const response = await fetch("/api/youtube-live", { cache: "no-store" });
        if (!response.ok) throw new Error("Live indisponível");
        const data: { live?: boolean } = await response.json();
        if (active) setLive(data.live === true);
      } catch {
        if (active) setLive(false); // Sem confirmação, indicador permanece neutro.
      }
    };
    void checkLive();
    const timer = window.setInterval(checkLive, 300_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setWhoOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => { setOpen(false); setWhoOpen(false); };
  const navigation = (
    <header className={`site-header${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="header-inner container">
        <Link href="/" className="brand" aria-label="Igreja Batista do Marapé — início" onClick={closeMenu}>
          <img src="/logo-completo-branco.png" alt="Igreja Batista do Marapé" />
        </Link>

        <nav className="desktop-nav" aria-label="Menu principal">
          <div className="nav-dropdown">
            <Link href="/igreja" aria-haspopup="true" aria-expanded={undefined}>
              Quem Somos <span className="nav-chevron" aria-hidden="true">⌄</span>
            </Link>
            <div className="nav-dropdown-menu">
              <Link href="/igreja/historia">Nossa História</Link>
            </div>
          </div>
          {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link className={`live-link${live ? " is-live" : ""}`} href="/ao-vivo">
            <span aria-hidden="true" className="live-dot" />Ao vivo
          </Link>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span />{open ? <span className="menu-close">×</span> : <span />}
        </button>
      </div>

      <nav id="mobile-menu" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Menu mobile" aria-hidden={!open}>
        <div className="mobile-nav-group">
          <div className="mobile-nav-parent">
            <Link href="/igreja" tabIndex={open ? 0 : -1} onClick={closeMenu}>Quem Somos <span aria-hidden="true">↗</span></Link>
            <button type="button" aria-label="Expandir Nossa História" aria-expanded={whoOpen} onClick={() => setWhoOpen(value => !value)}>
              <span aria-hidden="true">{whoOpen ? "−" : "+"}</span>
            </button>
          </div>
          {whoOpen && <Link className="mobile-nav-subitem" tabIndex={open ? 0 : -1} href="/igreja/historia" onClick={closeMenu}>
            Nossa História <span aria-hidden="true">↗</span>
          </Link>}
        </div>
        {links.map((item) => (
          <Link tabIndex={open ? 0 : -1} key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}<span aria-hidden="true">↗</span>
          </Link>
        ))}
        <Link tabIndex={open ? 0 : -1} href="/ao-vivo" className="mobile-live-link" onClick={closeMenu}>
          <span className={`live-dot${live ? " is-live" : ""}`} aria-hidden="true" />Ao vivo
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );

  // Mantém o cabeçalho acima das camadas do hero/GSAP.
  return mounted ? createPortal(navigation, document.body) : navigation;
}
