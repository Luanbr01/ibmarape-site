import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Páginas institucionais provisórias; Ministérios, Mensagens e Eventos têm rotas próprias.
const pages: Record<string, { title: string; tag: string; description: string }> = {
  "igreja": { title: "A Igreja", tag: "QUEM SOMOS", description: "Conheça a Igreja Batista do Marapé." },
  "igreja/declaracao-doutrinaria": { title: "O que cremos", tag: "A IGREJA", description: "Conteúdo doutrinário a ser revisado pela igreja." },
  "igreja/lideranca": { title: "Liderança", tag: "A IGREJA", description: "Conheça a liderança da igreja." },
  "contato": { title: "Contato", tag: "FALE CONOSCO", description: "Em breve, informações oficiais de contato." },
  "visite-nos": { title: "Visite-nos", tag: "SEJA BEM-VINDO", description: "Em breve, horários e informações para sua visita." },
};

export function generateStaticParams() {
  return Object.keys(pages).map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug.join("/")]?.title || "Página não encontrada" };
}

export default async function InstitutionalPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();
  return (
    <main className="inner-main">
      <div className="container inner-content">
        <p className="eyebrow"><span />{page.tag}</p>
        <h1>{page.title}<span className="dot">.</span></h1>
        <p>{page.description}</p>
        <Link href="/" className="btn btn-outline">Voltar para início <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
