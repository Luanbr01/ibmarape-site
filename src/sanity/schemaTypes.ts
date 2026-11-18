import { defineField, defineType } from "sanity";
const imageField = (name: string, title: string) => defineField({ name, title, type: "image", options: { hotspot: true } });
const link = defineType({ name: "actionLink", title: "Link", type: "object", fields: [defineField({ name: "label", title: "Texto do botão", type: "string" }), defineField({ name: "href", title: "Destino (rota ou URL)", type: "string" })] });
// Campos opcionais: os documentos já publicados continuam válidos.
const home = defineType({
    name: "homePage",
    title: "Página inicial",
    type: "document",
    description: "Edite as seções da homepage sem alterar o layout ou as animações. Publique as mudanças ao terminar.",
    groups: [
        { name: "hero", title: "01 · Abertura", default: true },
        { name: "welcome", title: "02 · Boas-vindas" },
        { name: "ministries", title: "03 · Ministérios" },
        { name: "messages", title: "04 · Mensagens" },
        { name: "events", title: "05 · Eventos" },
        { name: "history", title: "06 · História" },
        { name: "final", title: "07 · Convite final" },
    ],
    fields: [
        defineField({ name: "title", title: "Título sobre o vídeo", type: "string", group: "hero", validation: r => r.required(), description: "Título principal da primeira tela. O tamanho é ajustado em Personalização do site." }),
        defineField({ name: "heroPoster", title: "Imagem principal (fallback do vídeo)", type: "image", group: "hero", options: { hotspot: true }, description: "Imagem mostrada enquanto o vídeo carrega ou quando não houver vídeo. Opcional." }),
        defineField({ name: "heroVideoFile", title: "Vídeo principal (upload MP4)", type: "file", group: "hero", options: { accept: "video/mp4" }, description: "Envie um MP4 otimizado. O vídeo toca sem áudio, em loop. Se vazio, o site mostra apenas a imagem." }),
        defineField({ name: "heroVideoUrl", title: "Vídeo externo antigo", type: "url", hidden: true, group: "hero" }),
        defineField({ name: "welcomeEnabled", title: "Mostrar boas-vindas", type: "boolean", group: "welcome", initialValue: true, description: "Desative para esconder a seção inteira, sem apagar seu conteúdo." }),
        defineField({ name: "welcomeTitle", title: "Título de boas-vindas", type: "string", group: "welcome" }),
        defineField({ name: "welcomeText", title: "Texto curto de boas-vindas", type: "text", rows: 2, group: "welcome", description: "Prefira uma única frase; a homepage é minimalista." }),
        defineField({ name: "welcomePhoto", title: "Foto da comunidade", type: "image", options: { hotspot: true }, group: "welcome" }),
        defineField({ name: "ministriesEnabled", title: "Mostrar ministérios", type: "boolean", initialValue: true, group: "ministries" }),
        defineField({ name: "ministriesTitle", title: "Título da seção", type: "string", initialValue: "Ministérios", group: "ministries" }),
        defineField({ name: "featuredMinistries", title: "Ministérios em destaque (até 3)", type: "array", group: "ministries", description: "Primeiro cadastre e publique os ministérios na área Ministérios. Depois selecione os cards aqui e arraste para mudar a ordem. Vazio: o site usa os primeiros cadastrados.", of: [{ type: "reference", to: [{ type: "ministry" }] }], validation: r => r.max(3) }),
        defineField({ name: "messagesEnabled", title: "Mostrar mensagens", type: "boolean", initialValue: true, group: "messages" }),
        defineField({ name: "messagesTitle", title: "Título da seção", type: "string", initialValue: "Mensagens", group: "messages" }),
        defineField({ name: "messagesText", title: "Descrição curta", type: "string", initialValue: "Palavra que edifica.", group: "messages" }),
        defineField({ name: "featuredMessage", title: "Mensagem em destaque", type: "reference", to: [{ type: "message" }], group: "messages", description: "Escolha uma mensagem publicada. Vazio: exibe a mais recente." }),
        defineField({ name: "messagePhoto", title: "Imagem alternativa de Mensagens", type: "image", options: { hotspot: true }, group: "messages", description: "Usada se a mensagem selecionada não possuir capa." }),
        defineField({ name: "eventsEnabled", title: "Mostrar eventos", type: "boolean", initialValue: true, group: "events" }),
        defineField({ name: "eventsTitle", title: "Título da seção", type: "string", initialValue: "Eventos", group: "events" }),
        defineField({ name: "eventsText", title: "Descrição curta", type: "string", initialValue: "Acompanhe nossa programação.", group: "events" }),
        defineField({ name: "featuredEvents", title: "Evento em destaque", type: "array", group: "events", description: "Selecione um evento publicado para destacar na capa da homepage. Vazio: mostra o próximo evento futuro com capa; se não houver, usa a imagem alternativa.", of: [{ type: "reference", to: [{ type: "event" }] }], validation: r => r.max(1) }),
        defineField({ name: "eventPhoto", title: "Imagem alternativa de Eventos", type: "image", options: { hotspot: true }, group: "events" }),
        defineField({ name: "historyEnabled", title: "Mostrar história", type: "boolean", initialValue: true, group: "history" }),
        defineField({ name: "historyTitle", title: "Título da seção", type: "string", initialValue: "Nossa história", group: "history" }),
        defineField({ name: "historyPhoto", title: "Foto da história", type: "image", options: { hotspot: true }, group: "history" }),
        defineField({ name: "finalEnabled", title: "Mostrar convite final", type: "boolean", initialValue: true, group: "final" }),
        defineField({ name: "finalTitle", title: "Título do convite", type: "string", initialValue: "Venha conhecer.", group: "final" }),
        defineField({ name: "finalPhoto", title: "Imagem do convite final", type: "image", options: { hotspot: true }, group: "final", description: "Foto exibida atrás da última chamada. O gradiente escuro para leitura é mantido." }),
    ],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: "Página inicial — IBM", subtitle: title || "Conteúdo da homepage" }) },
});
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
    description: "Após PUBLICAR, abra a homepage com ?debugSettings=1 para conferir exatamente quais valores o site recebeu. Aumente ou diminua bastante um valor para testar. As animações começam ao rolar a página novamente.",
    groups: [
        { name: "typography", title: "Tipografia", default: true },
        { name: "motion", title: "Animações" },
        { name: "layout", title: "Espaçamento" },
    ],
    fields: [
        defineField({
            name: "heroTitleSize",
            title: "Tamanho máximo do título principal (px)",
            description: "Somente o título grande sobre o vídeo da primeira tela (NÃO altera o logotipo nem o menu). Ex.: 50 = menor; 90 = maior. Confirme em /?debugSettings=1. É um LIMITE MÁXIMO: em telas estreitas o tamanho se ajusta à largura. Não muda o nome da igreja no menu. Publique e atualize a homepage.",
            type: "number",
            group: "typography",
            initialValue: 76,
            validation: rule => rule.min(40).max(112).integer(),
        }),
        defineField({
            name: "sectionTitleSize",
            title: "Tamanho máximo dos títulos das seções (px)",
            description: "Títulos das seções abaixo do vídeo, como Ministérios, Mensagens, Eventos e Nossa história. Ex.: 40 = menores; 70 = maiores. Confirme em /?debugSettings=1. Não altera o tamanho dos cards nem dos textos menores. Padrão 56 px. Publique e atualize a homepage.",
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

const milestone = defineType({
    name: "historyMilestone", title: "Nossa História · Linha do tempo", type: "document",
    description: "Cadastre apenas acontecimentos históricos confirmados. Ordenação pelo ano, depois pela ordem dentro do ano.",
    fields: [
        defineField({ name: "year", title: "Ano", type: "number", validation: rule => rule.required().integer().min(1800).max(2200) }),
        defineField({ name: "order", title: "Ordem no mesmo ano", type: "number", initialValue: 0, description: "Se houver mais de um acontecimento no mesmo ano, use 1, 2, 3..." }),
        defineField({ name: "title", title: "Título do acontecimento", type: "string", validation: rule => rule.required() }),
        defineField({ name: "description", title: "Descrição", type: "text", rows: 4 }),
        defineField({ name: "photo", title: "Foto histórica (opcional)", type: "image", options: { hotspot: true } }),
    ],
    preview: { select: { title: "title", year: "year", media: "photo" }, prepare({ title, year, media }) { return { title, subtitle: year ? String(year) : "Sem ano", media }; } },
});

const historyPage = defineType({
    name: "historyPage", title: "Nossa História · Apresentação", type: "document",
    fields: [
        defineField({ name: "eyebrow", title: "Etiqueta acima do título", type: "string", initialValue: "NOSSA HISTÓRIA" }),
        defineField({ name: "title", title: "Título principal", type: "string", initialValue: "Uma história de fé." }),
        defineField({ name: "introduction", title: "Introdução", type: "text", rows: 3, description: "Texto breve que introduz a linha do tempo." }),
        defineField({ name: "cover", title: "Fotografia de abertura (opcional)", type: "image", options: { hotspot: true } }),
    ], preview: { prepare: () => ({ title: "Nossa História · Apresentação" }) },
});

const bulletin = defineType({
    name: "bulletin", title: "Boletins", type: "document",
    fields: [
        defineField({ name: "title", title: "Título do boletim", type: "string", validation: rule => rule.required() }),
        defineField({ name: "publishedAt", title: "Data do boletim", type: "date", validation: rule => rule.required() }),
        defineField({ name: "summary", title: "Descrição breve (opcional)", type: "text", rows: 2 }),
        defineField({ name: "file", title: "Boletim em PDF", type: "file", options: { accept: "application/pdf" }, validation: rule => rule.required() }),
        defineField({ name: "cover", title: "Imagem de capa (opcional)", type: "image", options: { hotspot: true } }),
    ], preview: { select: { title: "title", subtitle: "publishedAt", media: "cover" } },
});

export const schemaTypes = [link, home, ministry, message, event, siteSettings, milestone, historyPage, bulletin];
