import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";
export default function Studio() {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return <main style={{ padding: 40, fontFamily: "sans-serif" }}><h1>Sanity ainda não configurado</h1><p>Crie um projeto Sanity e defina NEXT_PUBLIC_SANITY_PROJECT_ID no .env.local.</p></main>;
    }
    return <NextStudio config={config}/>;
}
