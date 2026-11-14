import { sanityClient } from "./client";
export type Ministry = {
    title: string;
    slug: string;
    summary?: string;
    cover?: string;
};
export type Message = {
    title: string;
    slug: string;
    videoUrl?: string;
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
    welcomeTitle?: string;
    welcomeText?: string;
    heroPoster?: string;
    heroVideo?: string;
    welcomePhoto?: string;
    messagePhoto?: string;
    eventPhoto?: string;
    historyPhoto?: string;
    featuredMinistries?: Ministry[];
    featuredMessage?: Message;
};
async function fetchSafe<T>(query: string): Promise<T | null> { if (!sanityClient)
    return null; try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: 60 } });
}
catch (err) {
    console.error("[Sanity] Consulta falhou:", err);
    return null;
} }
export function getHomeContent() {
    return fetchSafe<HomeContent>(`*[_type=="homePage"]|order(_updatedAt desc)[0]{title,welcomeTitle,welcomeText,
 "heroPoster":heroPoster.asset->url,"heroVideo":coalesce(heroVideoFile.asset->url,heroVideoUrl),
 "welcomePhoto":welcomePhoto.asset->url,"messagePhoto":messagePhoto.asset->url,
 "eventPhoto":eventPhoto.asset->url,"historyPhoto":historyPhoto.asset->url,
 "featuredMinistries":featuredMinistries[]->{title,"slug":slug.current,summary,"cover":cover.asset->url},
 "featuredMessage":featuredMessage->{title,"slug":slug.current,videoUrl,"cover":cover.asset->url,publishedAt}
}`);
}
export function getMinistries() { return fetchSafe<Ministry[]>(`*[_type=="ministry" && defined(slug.current)]|order(title asc){title,"slug":slug.current,summary,"cover":cover.asset->url}`); }
export function getMessages() { return fetchSafe<Message[]>(`*[_type=="message" && defined(slug.current)]|order(publishedAt desc){title,"slug":slug.current,videoUrl,"cover":cover.asset->url,publishedAt}`); }
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
    const data = await fetchSafe<SiteSettingsInput>(
        `*[_type == "siteSettings" && _id == "siteSettings"][0]{
          heroTitleSize, sectionTitleSize, animationDuration, animationDistance, sectionSpacing
        }`
    );
    return normalizeSiteSettings(data);
}
