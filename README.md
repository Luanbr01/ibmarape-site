# IBM — Site da Igreja Batista do Marapé

Primeira entrega: homepage minimalista cinematográfica com **Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP, Lenis** e integração inicial opcional com **Sanity Studio**.

## Pré-requisitos

- Node.js 22.12 ou superior (recomendado para o Sanity Studio atual)
- npm

## Rodar localmente (Windows / PowerShell)

1. Extraia o ZIP em uma pasta, por exemplo `C:\Projetos\ibmarape-site`.
2. Abra a pasta no VS Code e abra o terminal.
3. Instale as dependências:

```powershell
npm install
```

4. Execute:

```powershell
npm run dev
```

5. Abra `http://localhost:3000` no navegador.

A página funciona sem Sanity configurado, usando conteúdo de demonstração. **Não inclui dados fictícios de cultos, pastores, eventos ou localização.**

## Vídeo e fotos reais

Copie para `public/media/`:

- `hero-poster.jpg` — imagem para abertura e fallback;
- `hero.mp4` — vídeo cinematográfico sem áudio, otimizado para web.

O hero usa esses arquivos por padrão. As demais fotos são exemplos remotos provisórios definidos em `src/app/globals.css` e `src/lib/content.ts`. Substitua essas imagens antes da publicação. O logotipo original já foi copiado para `public/`.

## Conectar ao Sanity

1. Acesse `https://www.sanity.io/manage` e crie um projeto.
2. Copie `.env.example` para `.env.local`.
3. Configure o **ID público** do projeto e o dataset:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Reinicie `npm run dev`.
5. Abra `http://localhost:3000/studio`, entre com sua conta autorizada e crie um documento do tipo **Página inicial**.
6. Preencha os campos e publique. O conteúdo principal será buscado do Sanity.

Se o Studio não conseguir acessar o projeto, cadastre `http://localhost:3000` nas origens CORS permitidas nas configurações de API do Sanity, habilitando credenciais para login no Studio. Não coloque tokens privados em `NEXT_PUBLIC_*`.

**Integração nesta versão:** campos do hero e boas-vindas. Os tipos Ministérios, Mensagens e Eventos já estão modelados no Studio, mas suas listagens ainda usam conteúdo demonstrativo ou páginas de estrutura. Consultas dinâmicas para essas listagens, prévia editorial, formulários e páginas completas virão nas próximas etapas.

## Rotas

- `/` — homepage funcional
- `/igreja`, `/igreja/historia`, `/igreja/lideranca`, `/igreja/declaracao-doutrinaria`
- `/ministerios`, `/ministerios/marape-kids`, `/ministerios/pro-viver`
- `/mensagens`, `/eventos`, `/contato`, `/visite-nos`, `/ao-vivo`
- `/studio` — Sanity Studio (configuração necessária)

As páginas internas nesta entrega são **estruturas navegáveis com conteúdo provisório**, não páginas institucionais finalizadas.

## Estrutura

- `src/app` — rotas e estilos globais
- `src/components` — Header, Hero, Footer e animações
- `src/sanity` — cliente, modelos de conteúdo e consultas
- `src/lib` — dados de demonstração
- `public/` — logotipos e mídia local

## Pontos de atenção

- O vídeo deve ser comprimido para evitar downloads muito grandes em celulares.
- Todas as imagens provisórias devem ser trocadas pelo acervo autorizado.
- Não coloque tokens secretos em código público ou no Git.
- As fontes do manual (Gotham etc.) não foram incluídas: precisam de licença e arquivos autorizados. Esta versão usa fontes de sistema similares como fallback.
- Em produção, revisar acessibilidade, SEO, horários reais, links e política de privacidade.

## Referências oficiais

- https://nextjs.org/docs/app/getting-started/installation
- https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
- https://gsap.com/resources/React/
- https://lenis.darkroom.engineering/
