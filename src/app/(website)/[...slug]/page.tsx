import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMinistries, getMessages, getEvents } from "@/sanity/queries";
const pages: Record<string, {
    title: string;
    tag: string;
    description: string;
    parent?: string;
}> = {
    "igreja": { title: "A Igreja", tag: "QUEM SOMOS", description: "Conheça a Igreja Batista do Marapé." },
    "igreja/historia": { title: "Nossa história", tag: "A IGREJA", description: "Em breve, esta página reunirá a história oficial da igreja." },
    "igreja/declaracao-doutrinaria": { title: "O que cremos", tag: "A IGREJA", description: "Conteúdo doutrinário a ser revisado e publicado pela igreja." },
    "igreja/lideranca": { title: "Liderança", tag: "A IGREJA", description: "Apresentação dos pastores e líderes da igreja." },
    "ministerios": { title: "Ministérios", tag: "COMUNIDADE", description: "Conheça os ministérios e participe da nossa comunidade." },
    "ministerios/marape-kids": { title: "Marapé Kids", tag: "MINISTÉRIOS", description: "Em breve, informações do ministério." },
    "ministerios/pro-viver": { title: "Pró-Viver", tag: "MINISTÉRIOS", description: "Em breve, informações do ministério." },
    "mensagens": { title: "Mensagens", tag: "CONTEÚDO", description: "Em breve, as mensagens e séries da igreja." },
    "eventos": { title: "Eventos", tag: "AGENDA", description: "Em breve, os próximos eventos da igreja." },
    "contato": { title: "Contato", tag: "FALE CONOSCO", description: "Em breve, as informações oficiais de contato e localização." },
    "visite-nos": { title: "Visite-nos", tag: "SEJA BEM-VINDO", description: "Em breve, horários e informações oficiais para sua visita." },
    "ao-vivo": { title: "Ao vivo", tag: "TRANSMISSÃO", description: "O link oficial da transmissão será cadastrado pela equipe." },
};
export function generateStaticParams() { return Object.keys(pages).map(path => ({ slug: path.split("/") })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string[];
    }>;
}): Promise<Metadata> { const { slug } = await params; return { title: pages[slug.join("/")]?.title || "Página" }; }
export default async function InnerPage({ params }: {
    params: Promise<{
        slug: string[];
    }>;
}) {
    const { slug } = await params;
    const path = slug.join("/");
    const [ministries, messages, events] = await Promise.all([getMinistries(), getMessages(), getEvents()]);
    const collections: {
        [key: string]: {
            title: string;
            items: {
                title: string;
                slug: string;
                cover?: string;
                summary?: string;
                description?: string;
            }[] | null;
        };
    } = {
        "ministerios": { title: "Ministérios", items: ministries }, "mensagens": { title: "Mensagens", items: messages }, "eventos": { title: "Eventos", items: events }
    };
    const collection = collections[path];
    if (collection?.items?.length) {
        return <main className="inner-main"><div className="container inner-content"><p className="eyebrow"><span />IGREJA BATISTA DO MARAPÉ</p><h1>{collection.title}<span className="dot">.</span></h1><div className="cms-grid">{collection.items.map(item => <Link className="cms-item" key={item.slug} href={`/${path}/${item.slug}`}><div className="cms-thumb" style={item.cover ? { backgroundImage: `url("${item.cover}")` } : undefined}/><h2>{item.title}</h2><span>Saiba mais ↗</span></Link>)}</div></div></main>;
    }
    const itemType = slug[0];
    const itemSlug = slug[1];
    if (slug.length === 2 && ["ministerios", "mensagens", "eventos"].includes(itemType)) {
        const rows = itemType === "ministerios" ? ministries : itemType === "mensagens" ? messages : events;
        const found = rows?.find(item => item.slug === itemSlug);
        if (found) {
            const desc = "summary" in found ? found.summary : "description" in found ? found.description : undefined;
            return <main className="inner-main"><div className="container inner-content"><p className="eyebrow"><span />IGREJA BATISTA DO MARAPÉ</p><h1>{found.title}<span className="dot">.</span></h1>{found.cover && <div className="cms-detail-cover" style={{ backgroundImage: `url("${found.cover}")` }}/>}{desc && <p>{desc}</p>}{"videoUrl" in found && found.videoUrl && <p><a className="btn btn-outline" href={found.videoUrl} target="_blank" rel="noopener noreferrer">Assistir mensagem ↗</a></p>}{"registrationUrl" in found && found.registrationUrl && <p><a className="btn btn-outline" href={found.registrationUrl} target="_blank" rel="noopener noreferrer">Inscrever-se ↗</a></p>}<Link href={`/${itemType}`} className="text-link light">Voltar ↗</Link></div></main>;
        }
    }
    const page = pages[path];
    if (!page)
        notFound();
    return <main className="inner-main"><div className="container inner-content"><p className="eyebrow"><span />{page.tag}</p><h1>{page.title}<span className="dot">.</span></h1><p>{page.description}</p><Link href="/" className="btn btn-outline">Voltar para início <span>↗</span></Link></div></main>;
}
