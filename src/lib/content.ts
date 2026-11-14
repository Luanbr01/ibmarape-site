/** Conteúdo de demonstração. Nada aqui afirma horários, eventos ou pregações reais. */
export type Card = {
    title: string;
    subtitle?: string;
    image: string;
    href: string;
};
export const sections = {
    ministries: [
        { title: "Marapé Kids", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80", href: "/ministerios/marape-kids" },
        { title: "Pró-Viver", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80", href: "/ministerios/pro-viver" },
        { title: "Conheça os ministérios", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80", href: "/ministerios" },
    ] satisfies Card[],
};
export const fallbackHome = {
    title: "Uma igreja viva adorando ao Deus vivo.",
    welcomeTitle: "Uma igreja, uma família.",
    welcomeText: "Conheça a Igreja Batista do Marapé.",
    heroPoster: "/media/hero-poster.jpg", // Substitua pela foto real da igreja
    heroVideo: "/media/hero.mp4", // Opcional: vídeo institucional otimizado
};
