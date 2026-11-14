# IBM — Upload direto de vídeo via Sanity

## Instalação

1. Substitua os arquivos antigos pelos arquivos desta versão (guarde backup de `.env.local` e dos seus próprios arquivos de mídia).
2. Mantenha o seu `.env.local` atual na raiz do projeto; ele não acompanha o ZIP.
3. No terminal da pasta `ibmarape-site`, execute `npm install` e `npm run dev`.
4. Abra `http://localhost:3000/studio` e entre em **Página inicial**.
5. No campo **Vídeo principal (upload MP4)**, clique em **Upload** e envie um vídeo `.mp4`.
6. No campo **Imagem principal (fallback do vídeo)**, envie uma foto da igreja. Esta foto aparecerá enquanto o vídeo carrega ou em caso de falha.
7. Clique em **Publish** e abra `http://localhost:3000`. Pode haver até 60 segundos de cache antes de o conteúdo publicado aparecer; atualize após esse intervalo.

## Comportamento

- O Sanity armazena o MP4 como `file` e fornece a URL do asset pelo GROQ (`heroVideoFile.asset->url`).
- O `Hero.tsx` utiliza essa URL no elemento HTML `<video>`, com `autoPlay muted loop playsInline`.
- Não existe player com controles: é vídeo decorativo de fundo, sem som.
- O vídeo publicado substitui o vídeo local de demonstração; um documento da homepage publicado sem vídeo exibe somente a imagem.
- Caso a URL do vídeo falhe, o elemento de vídeo sai de cena e a imagem de fallback permanece.
- O campo antigo `heroVideoUrl` foi mantido oculto para compatibilidade com publicações existentes. Quando o novo upload for preenchido, ele terá prioridade.

## Recomendação para o arquivo

- MP4 com codec H.264, sem áudio, duração de aproximadamente 8–20 segundos.
- Resolução 1280×720 ou 1920×1080, com tamanho reduzido (idealmente até ~8 MB, dependendo do conteúdo e da rede).
- Prepare também uma imagem de capa em boa qualidade; vídeos não têm a mesma otimização automática de imagens no Sanity.
- Consulte os limites de armazenamento e banda do seu plano Sanity.

## Teste de produção

Execute `npm run build` e `npm run start` antes do deploy. Este projeto ainda não foi testado contra a sua conta Sanity real.
