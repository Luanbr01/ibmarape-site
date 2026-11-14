import type { CSSProperties, ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { getSiteSettings } from "@/sanity/queries";

/** Define os valores CSS para toda a área pública; o Studio fica isolado. */
export default async function WebsiteLayout({ children }: { children: ReactNode }) {
    const settings = await getSiteSettings();
    const designVars = {
        "--hero-title-size": `${settings.heroTitleSize}px`,
        "--section-title-size": `${settings.sectionTitleSize}px`,
        "--section-spacing": `${settings.sectionSpacing}px`,
    } as CSSProperties;

    return (
        <>
            {/* O cabeçalho fica fora do wrapper do conteúdo para que o
                position: fixed não seja afetado por camadas/efeitos do hero. */}
            <Header />
            <div className="website-shell" style={designVars}>
                {children}
                <Footer />
                <MotionProvider
                    duration={settings.animationDuration}
                    distance={settings.animationDistance}
                />
            </div>
        </>
    );
}
