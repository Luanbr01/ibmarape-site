"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "@/sanity/queries";

export function SiteSettingsDiagnostics({ settings }: { settings: SiteSettings }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(new URLSearchParams(window.location.search).get("debugSettings") === "1"), []);
  if (!visible) return null;
  return (
    <aside aria-label="Diagnóstico das configurações" style={{ position: "fixed", right: 12, bottom: 12, zIndex: 2147483001, background: "#171717", color: "#fff", border: "1px solid #00B9FF", borderRadius: 8, padding: "12px 16px", fontSize: 12, lineHeight: 1.6, boxShadow: "0 6px 22px #0007" }}>
      <strong style={{ color: "#00B9FF" }}>Configurações efetivas da homepage</strong>
      <div>Hero: {settings.heroTitleSize}px · Seções: {settings.sectionTitleSize}px</div>
      <div>Animação: {settings.animationDuration}s · Movimento: {settings.animationDistance}px</div>
      <div>Espaçamento: {settings.sectionSpacing}px</div>
      <small>Leia os valores após publicar e recarregar a página.</small>
    </aside>
  );
}
