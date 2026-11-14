import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: { default: "Igreja Batista do Marapé", template: "%s | Igreja Batista do Marapé" }, description: "Igreja Batista do Marapé — uma igreja viva adorando ao Deus vivo.", icons: { icon: "/logo-150x150.png" } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="pt-BR"><body>{children}</body></html>; }
