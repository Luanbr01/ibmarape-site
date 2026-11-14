import { defineField, defineType } from "sanity";
const imageField = (name: string, title: string) => defineField({ name, title, type: "image", options: { hotspot: true } });
const link = defineType({ name: "actionLink", title: "Link", type: "object", fields: [defineField({ name: "label", title: "Texto do botão", type: "string" }), defineField({ name: "href", title: "Destino (rota ou URL)", type: "string" })] });
const home = defineType({ name: "homePage", title: "Página inicial", type: "document", fields: [
        defineField({ name: "title", title: "Frase principal", type: "string", validation: r => r.required() }),
        imageField("heroPoster", "Imagem principal (fallback do vídeo)"),
        defineField({
            name: "heroVideoFile",
            title: "Vídeo principal (upload MP4)",
            type: "file",
            options: { accept: "video/mp4" },
            description: "Envie um MP4 otimizado (H.264, sem áudio). O vídeo será reproduzido em loop no fundo da página inicial. Se estiver vazio, será mostrada apenas a imagem de fallback.",
            validation: rule => rule.custom(file => {
                // A validação do formato é feita no upload. Arquivo opcional.
                return file && !file.asset ? "Escolha um vídeo MP4 válido." : true;
            }),
        }),
        // Campo antigo preservado, oculto para não interromper links já publicados.
        defineField({ name: "heroVideoUrl", title: "Vídeo externo antigo", type: "url", hidden: true }),
        defineField({ name: "welcomeTitle", title: "Título de boas-vindas", type: "string" }),
        defineField({ name: "welcomeText", title: "Texto curto", type: "text", rows: 2 }),
        imageField("welcomePhoto", "Foto da comunidade"),
        imageField("messagePhoto", "Foto da seção Mensagens"),
        imageField("eventPhoto", "Foto da seção Eventos"),
        imageField("historyPhoto", "Foto da seção Nossa História"),
        defineField({ name: "featuredMinistries", title: "Ministérios destacados", type: "array", of: [{ type: "reference", to: [{ type: "ministry" }] }], validation: r => r.max(3) }),
        defineField({ name: "featuredMessage", title: "Mensagem em destaque", type: "reference", to: [{ type: "message" }] }),
    ] });
const ministry = defineType({ name: "ministry", title: "Ministérios", type: "document", fields: [
        defineField({ name: "title", title: "Nome", type: "string", validation: r => r.required() }),
        defineField({ name: "slug", title: "Endereço da página", type: "slug", options: { source: "title" }, validation: r => r.required() }),
        imageField("cover", "Capa"), defineField({ name: "summary", title: "Descrição curta", type: "text", rows: 3 }),
        defineField({ name: "description", title: "Conteúdo completo", type: "array", of: [{ type: "block" }] }),
    ] });
const message = defineType({ name: "message", title: "Mensagens", type: "document", fields: [
        defineField({ name: "title", title: "Título", type: "string", validation: r => r.required() }),
        defineField({ name: "slug", title: "Endereço da página", type: "slug", options: { source: "title" }, validation: r => r.required() }),
        defineField({ name: "publishedAt", title: "Data", type: "date" }),
        defineField({ name: "speaker", title: "Pregador", type: "string" }),
        defineField({ name: "videoUrl", title: "Link YouTube ou Vimeo", type: "url" }),
        imageField("cover", "Capa"),
    ] });
const event = defineType({ name: "event", title: "Eventos", type: "document", fields: [
        defineField({ name: "title", title: "Nome", type: "string", validation: r => r.required() }),
        defineField({ name: "slug", title: "Endereço da página", type: "slug", options: { source: "title" }, validation: r => r.required() }),
        defineField({ name: "startsAt", title: "Data e hora", type: "datetime" }),
        imageField("cover", "Capa"), defineField({ name: "description", title: "Descrição", type: "text", rows: 4 }),
        defineField({ name: "registrationUrl", title: "Link externo de inscrição", type: "url" }),
    ] });

// Configurações visuais globais: um único documento no Studio.
const siteSettings = defineType({
    name: "siteSettings",
    title: "Personalização do site",
    type: "document",
    groups: [
        { name: "typography", title: "Tipografia", default: true },
        { name: "motion", title: "Animações" },
        { name: "layout", title: "Espaçamento" },
    ],
    fields: [
        defineField({
            name: "heroTitleSize",
            title: "Tamanho máximo do título principal (px)",
            description: "Padrão: 76 px. O valor é adaptado automaticamente para telas pequenas.",
            type: "number",
            group: "typography",
            initialValue: 76,
            validation: rule => rule.min(40).max(112).integer(),
        }),
        defineField({
            name: "sectionTitleSize",
            title: "Tamanho máximo dos títulos das seções (px)",
            description: "Padrão: 56 px.",
            type: "number",
            group: "typography",
            initialValue: 56,
            validation: rule => rule.min(28).max(90).integer(),
        }),
        defineField({
            name: "animationDuration",
            title: "Duração das animações de entrada (segundos)",
            description: "Padrão: 0,85 s. Controla os elementos que aparecem ao rolar a página.",
            type: "number",
            group: "motion",
            initialValue: 0.85,
            validation: rule => rule.min(0.2).max(2).precision(2),
        }),
        defineField({
            name: "animationDistance",
            title: "Distância de entrada dos elementos (px)",
            description: "Padrão: 35 px. Use 0 para apenas aparecer, sem deslocamento.",
            type: "number",
            group: "motion",
            initialValue: 35,
            validation: rule => rule.min(0).max(100).integer(),
        }),
        defineField({
            name: "sectionSpacing",
            title: "Espaçamento vertical das seções (px)",
            description: "Padrão: 110 px. A versão mobile usa um espaçamento proporcional.",
            type: "number",
            group: "layout",
            initialValue: 110,
            validation: rule => rule.min(40).max(180).integer(),
        }),
    ],
    preview: {
        prepare: () => ({ title: "Personalização do site", subtitle: "Fontes, animações e espaçamentos" }),
    },
});

export const schemaTypes = [link, home, ministry, message, event, siteSettings];
