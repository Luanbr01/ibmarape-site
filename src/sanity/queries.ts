import { sanityClient } from "./client";
export type Ministry = {
    title: string;
    slug: string;
    summary?: string;
    descriptionText?: string;
    cover?: string;
};
export type Message = {
    title: string;
    slug: string;
    videoUrl?: string;
    speaker?: string;
    cover?: string;
    publishedAt?: string;
};
export type ChurchEvent = {
    title: string;
    slug: string;
    startsAt?: string;
    description?: string;
    cover?: string;
    registrationUrl?: string;
};
export type HomeContent = {
    title?: string;
    heroPoster?: string;
    heroVideo?: string;
    welcomeEnabled?: boolean;
    welcomeTitle?: string;
    welcomeText?: string;
    welcomePhoto?: string;
    ministriesEnabled?: boolean;
    ministriesTitle?: string;
    featuredMinistries?: Ministry[];
    messagesEnabled?: boolean;
    messagesTitle?: string;
    messagesText?: string;
    featuredMessage?: Message;
    messagePhoto?: string;
    eventsEnabled?: boolean;
    eventsTitle?: string;
    eventsText?: string;
    featuredEvents?: ChurchEvent[];
    eventPhoto?: string;
    historyEnabled?: boolean;
    historyTitle?: string;
    historyPhoto?: string;
    finalEnabled?: boolean;
    finalTitle?: string;
    finalPhoto?: string;
};
async function fetchSafe<T>(query: string): Promise<T | null> { if (!sanityClient)
    return null; try {
    return await sanityClient.withConfig({ useCdn: false }).fetch<T>(query, {}, { cache: "no-store" });
}
catch (err) {
    console.error("[Sanity] Consulta falhou:", err);
    return null;
} }
export function getHomeContent() {
    return fetchSafe<HomeContent>(`*[_type == "homePage"] | order(_updatedAt desc)[0]{
        title, welcomeTitle, welcomeText, welcomeEnabled,
        ministriesEnabled, ministriesTitle,
        messagesEnabled, messagesTitle, messagesText,
        eventsEnabled, eventsTitle, eventsText,
        historyEnabled, historyTitle,
        finalEnabled, finalTitle,
        "heroPoster": heroPoster.asset->url,
        "heroVideo": coalesce(heroVideoFile.asset->url, heroVideoUrl),
        "welcomePhoto": welcomePhoto.asset->url,
        "messagePhoto": messagePhoto.asset->url,
        "eventPhoto": eventPhoto.asset->url,
        "historyPhoto": historyPhoto.asset->url,
        "finalPhoto": finalPhoto.asset->url,
        "featuredMinistries": featuredMinistries[]->{
            title, "slug": slug.current, summary, "cover": cover.asset->url
        },
        "featuredMessage": featuredMessage->{
            title, "slug": slug.current, videoUrl, "cover": cover.asset->url, publishedAt
        },
        "featuredEvents": featuredEvents[]->{
            title, "slug": slug.current, startsAt, description,
            "cover": cover.asset->url, registrationUrl
        }
    }`);
}
export function getMinistries() { return fetchSafe<Ministry[]>(`*[_type=="ministry" && defined(slug.current)]|order(title asc){title,"slug":slug.current,summary,"descriptionText": pt::text(description),"cover":cover.asset->url}`); }
export function getMessages() { return fetchSafe<Message[]>(`*[_type=="message" && defined(slug.current)]|order(publishedAt desc){title,"slug":slug.current,videoUrl,speaker,"cover":cover.asset->url,publishedAt}`); }
export function getEvents() { return fetchSafe<ChurchEvent[]>(`*[_type=="event" && defined(slug.current)]|order(startsAt asc){title,"slug":slug.current,startsAt,description,"cover":cover.asset->url,registrationUrl}`); }


/** Valores publicados pelo editor no painel Personalização do site. */
export type SiteSettingsInput = {
    heroTitleSize?: number;
    sectionTitleSize?: number;
    animationDuration?: number;
    animationDistance?: number;
    sectionSpacing?: number;
};

export const DEFAULT_SITE_SETTINGS = {
    heroTitleSize: 76,
    sectionTitleSize: 56,
    animationDuration: 0.85,
    animationDistance: 35,
    sectionSpacing: 110,
};
export type SiteSettings = typeof DEFAULT_SITE_SETTINGS;

const limits: Record<keyof SiteSettings, [number, number]> = {
    heroTitleSize: [40, 112],
    sectionTitleSize: [28, 90],
    animationDuration: [0.2, 2],
    animationDistance: [0, 100],
    sectionSpacing: [40, 180],
};

/** Proteção também no frontend para documentos antigos e dados inesperados. */
export function normalizeSiteSettings(input: SiteSettingsInput | null): SiteSettings {
    const result = { ...DEFAULT_SITE_SETTINGS };
    (Object.keys(result) as (keyof SiteSettings)[]).forEach((key) => {
        const value = input?.[key];
        if (typeof value !== "number" || !Number.isFinite(value)) return;
        const [min, max] = limits[key];
        result[key] = Math.min(max, Math.max(min, value));
    });
    return result;
}

export async function getSiteSettings(): Promise<SiteSettings> {
    if (!sanityClient) return normalizeSiteSettings(null);
    try {
        // Compatível com documento singleton e com IDs aleatórios criados antes.
        // Leitura direta da API sem cache: mudanças publicadas no Studio
        // ficam visíveis na próxima atualização da página.
        const data = await sanityClient.withConfig({ useCdn: false }).fetch<SiteSettingsInput | null>(
            `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
              heroTitleSize, sectionTitleSize, animationDuration, animationDistance, sectionSpacing
            }`,
            {},
            { cache: "no-store" }
        );
        return normalizeSiteSettings(data);
    } catch (error) {
        console.error("[Sanity] Não foi possível carregar a personalização:", error);
        return normalizeSiteSettings(null);
    }
}

/** Eventos históricos cadastrados manualmente. Nunca gera datas ou fatos fictícios. */
export type HistoryMilestone = { _id: string; year: number; title: string; description?: string; photo?: string };
export type HistoryPageData = { eyebrow?: string; title?: string; introduction?: string; cover?: string };
export type Bulletin = { _id: string; title: string; publishedAt: string; summary?: string; fileUrl?: string; cover?: string };

export function getHistoryPage() {
    return fetchSafe<HistoryPageData>(`*[_type == "historyPage" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{eyebrow,title,introduction,"cover":cover.asset->url}`);
}
export function getHistoryMilestones() {
    return fetchSafe<HistoryMilestone[]>(`*[_type == "historyMilestone" && !(_id in path("drafts.**")) && defined(year)] | order(year asc, order asc, _createdAt asc){_id,year,title,description,"photo":photo.asset->url}`);
}
export function getBulletins() {
    return fetchSafe<Bulletin[]>(`*[_type == "bulletin" && !(_id in path("drafts.**"))] | order(publishedAt desc){_id,title,publishedAt,summary,"fileUrl":file.asset->url,"cover":cover.asset->url}`);
}
