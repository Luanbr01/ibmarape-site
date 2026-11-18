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
    description: "Altere um campo, clique em Publicar e atualize a homepage. As animações só reiniciam quando você rola a página novamente; para testar, recarregue no topo.",
    groups: [
        { name: "typography", title: "Tipografia", default: true },
        { name: "motion", title: "Animações" },
        { name: "layout", title: "Espaçamento" },
    ],
    fields: [
        defineField({
            name: "heroTitleSize",
            title: "Tamanho máximo do título principal (px)",
            description: "Título 'Uma igreja viva adorando ao Deus vivo.' no vídeo da primeira tela. Ex.: 50 = menor; 90 = maior. É um LIMITE MÁXIMO: em telas estreitas o tamanho se ajusta à largura. Não muda o nome da igreja no menu. Publique e atualize a homepage.",
            type: "number",
            group: "typography",
            initialValue: 76,
            validation: rule => rule.min(40).max(112).integer(),
        }),
        defineField({
            name: "sectionTitleSize",
            title: "Tamanho máximo dos títulos das seções (px)",
            description: "Títulos como 'Ministérios', 'Mensagens', 'Eventos' e 'Nossa história'. Ex.: 40 = menores; 70 = maiores. Não altera o tamanho dos cards nem dos textos menores. Padrão 56 px. Publique e atualize a homepage.",
            type: "number",
            group: "typography",
            initialValue: 56,
            validation: rule => rule.min(28).max(90).integer(),
        }),
        defineField({
            name: "animationDuration",
            title: "Duração das animações de entrada (segundos)",
            description: "Tempo do fade + subida dos elementos ao rolar a página (data-reveal). 0,3 = rápido; 0,85 = normal; 1,5 = lento. NÃO muda o vídeo, os efeitos do menu, nem a velocidade do scroll. Para comparar, publique, recarregue no TOPO e role até uma seção ainda não revelada.",
            type: "number",
            group: "motion",
            initialValue: 0.85,
            validation: rule => rule.min(0.2).max(2).precision(2),
        }),
        defineField({
            name: "animationDistance",
            title: "Distância de entrada dos elementos (px)",
            description: "Quanto a foto/texto sobe ao aparecer durante a rolagem. 0 = só dissolve; 35 = subida discreta; 80 = subida maior. Afeta apenas elementos com data-reveal, uma vez por carregamento. Publique e recarregue antes de testar.",
            type: "number",
            group: "motion",
            initialValue: 35,
            validation: rule => rule.min(0).max(100).integer(),
        }),
        defineField({
            name: "sectionSpacing",
            title: "Espaçamento vertical das seções (px)",
            description: "Espaço ACIMA e ABAIXO de seções como Bem-vindo, Ministérios, Mensagens e Eventos. 60 = página mais compacta; 110 = atual; 160 = mais vazia. NÃO altera a altura do vídeo principal nem todos os blocos especiais, como História/rodapé. Mobile utiliza proporção menor.",
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


// Conteúdo institucional editável da página Nossa História.
const historyPage = defineType({
    name: "historyPage",
    title: "Nossa História — Apresentação",
    type: "document",
    fields: [
        defineField({ name: "title", title: "Título principal", type: "string", initialValue: "Nossa História" }),
        defineField({ name: "introduction", title: "Introdução (opcional)", type: "text", rows: 4,
            description: "Texto breve exibido sobre a fotografia de abertura." }),
        imageField("cover", "Fotografia de abertura"),
        defineField({ name: "coverAlt", title: "Descrição acessível da fotografia", type: "string" }),
    ],
    preview: { prepare: () => ({ title: "Nossa História — Apresentação" }) },
});

const historyMilestone = defineType({
    name: "historyMilestone",
    title: "Nossa História — Marcos da timeline",
    type: "document",
    orderings: [
        { title: "Ordem cronológica", name: "yearAsc", by: [
            { field: "year", direction: "asc" },
            { field: "order", direction: "asc" }
        ] },
    ],
    fields: [
        defineField({ name: "year", title: "Ano", type: "number",
            description: "Ex.: 1980. Cadastre apenas datas verificadas pela igreja.",
            validation: rule => rule.required().integer().min(1800).max(2200) }),
        defineField({ name: "title", title: "Título do acontecimento", type: "string",
            validation: rule => rule.required() }),
        defineField({ name: "description", title: "Descrição do acontecimento", type: "text", rows: 5 }),
        imageField("image", "Fotografia histórica (opcional)"),
        defineField({ name: "imageAlt", title: "Descrição acessível da fotografia", type: "string" }),
        defineField({ name: "imageCaption", title: "Legenda da fotografia", type: "string" }),
        defineField({ name: "order", title: "Ordem dentro do mesmo ano", type: "number",
            description: "Opcional. Utilize 1, 2, 3... caso existam vários acontecimentos no mesmo ano.",
            initialValue: 0, validation: rule => rule.integer().min(0) }),
    ],
    preview: {
        select: { title: "title", year: "year", media: "image" },
        prepare: ({ title, year, media }) => ({
            title: title || "Marco histórico",
            subtitle: year ? String(year) : "Ano não informado",
            media,
        }),
    },
});

export const schemaTypes = [link, home, ministry, message, event, siteSettings, historyPage, historyMilestone];
