"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
    console.warn("Configure NEXT_PUBLIC_SANITY_PROJECT_ID antes de usar o Sanity Studio");
}
export default defineConfig({
    name: "ibmarape", title: "IBMarapé | Conteúdo", basePath: "/studio",
    projectId: projectId || "placeholder", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    plugins: [
        structureTool({
            structure: (S) => S.list()
                .title("Conteúdo")
                .items([
                    S.listItem()
                        .title("Personalização do site")
                        .id("siteSettings")
                        .child(
                            S.document()
                                .schemaType("siteSettings")
                                .documentId("siteSettings")
                                .title("Personalização do site")
                        ),
                    S.divider(),
                    S.documentTypeListItem("homePage").title("Página inicial"),
                    S.documentTypeListItem("ministry").title("Ministérios"),
                    S.documentTypeListItem("message").title("Mensagens"),
                    S.documentTypeListItem("event").title("Eventos"),
                    S.documentTypeListItem("bulletin").title("Boletins"),
                    S.divider(),
                    S.listItem().title("Nossa História · Apresentação").child(
                        S.document().schemaType("historyPage").documentId("historyPage").title("Nossa História · Apresentação")
                    ),
                    S.documentTypeListItem("historyMilestone").title("Nossa História · Linha do tempo"),
                ]),
        }),
    ], schema: { types: schemaTypes }
});
