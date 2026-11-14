import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
const pages:Record<string,{title:string;tag:string;description:string;parent?:string}>={
 "igreja":{title:"A Igreja",tag:"QUEM SOMOS",description:"Conheça a Igreja Batista do Marapé."},
 "igreja/historia":{title:"Nossa história",tag:"A IGREJA",description:"Em breve, esta página reunirá a história oficial da igreja."},
 "igreja/declaracao-doutrinaria":{title:"O que cremos",tag:"A IGREJA",description:"Conteúdo doutrinário a ser revisado e publicado pela igreja."},
 "igreja/lideranca":{title:"Liderança",tag:"A IGREJA",description:"Apresentação dos pastores e líderes da igreja."},
 "ministerios":{title:"Ministérios",tag:"COMUNIDADE",description:"Conheça os ministérios e participe da nossa comunidade."},
 "ministerios/marape-kids":{title:"Marapé Kids",tag:"MINISTÉRIOS",description:"Em breve, informações do ministério."},
 "ministerios/pro-viver":{title:"Pró-Viver",tag:"MINISTÉRIOS",description:"Em breve, informações do ministério."},
 "mensagens":{title:"Mensagens",tag:"CONTEÚDO",description:"Em breve, as mensagens e séries da igreja."},
 "eventos":{title:"Eventos",tag:"AGENDA",description:"Em breve, os próximos eventos da igreja."},
 "contato":{title:"Contato",tag:"FALE CONOSCO",description:"Em breve, as informações oficiais de contato e localização."},
 "visite-nos":{title:"Visite-nos",tag:"SEJA BEM-VINDO",description:"Em breve, horários e informações oficiais para sua visita."},
 "ao-vivo":{title:"Ao vivo",tag:"TRANSMISSÃO",description:"O link oficial da transmissão será cadastrado pela equipe."},
};
export function generateStaticParams(){return Object.keys(pages).map(path=>({slug:path.split("/")}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;return {title:pages[slug.join("/")]?.title||"Página"}}
export default async function InnerPage({params}:{params:Promise<{slug:string[]}>}){
 const {slug}=await params;const page=pages[slug.join("/")];if(!page)notFound();
 return <main className="inner-main"><div className="container inner-content"><p className="eyebrow"><span/>{page.tag}</p><h1>{page.title}<span className="dot">.</span></h1><p>{page.description}</p><Link href="/" className="btn btn-outline">Voltar para início <span>↗</span></Link></div></main>
}
