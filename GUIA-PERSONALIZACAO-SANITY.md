# Personalização do site — Sanity Studio

Agora existe uma área **Personalização do site** no menu `/studio`.

## Como usar

1. Mantenha seu `.env.local` atual (não compartilhe tokens).
2. Rode `npm install` e `npm run dev`.
3. Entre em `http://localhost:3000/studio`.
4. Clique em **Personalização do site**.
5. Preencha os campos e clique em **Publish**.
6. Atualize `http://localhost:3000/` para verificar a mudança. A consulta tem cache de até 60 segundos.

## Padrões solicitados

| Controle | Valor padrão | Faixa permitida |
| --- | --- | --- |
| Título principal | 76 px | 40 a 112 px |
| Títulos de seção | 56 px | 28 a 90 px |
| Duração das animações de entrada | 0,85 s | 0,2 a 2 s |
| Distância das animações de entrada | 35 px | 0 a 100 px |
| Espaçamento entre seções | 110 px | 40 a 180 px |

Se ainda não houver configurações publicadas, o site usa os valores padrão automaticamente.

Os tamanhos são limites de fonte e se adaptam ao tamanho do dispositivo. No mobile, o espaçamento entre seções é reduzido proporcionalmente. Os campos de duração e distância controlam apenas as animações `[data-reveal]`, não o vídeo, nem os hovers, nem a duração do Lenis.

**Importante:** O Sanity Studio fornece campos numéricos, não sliders visuais. O site busca os valores publicados para alimentar variáveis CSS e animações GSAP. As preferências `prefers-reduced-motion` continuam respeitadas.

## Verificação

```powershell
npm run build
```

A homepage existente, o vídeo MP4 e o conteúdo já cadastrado no Sanity foram preservados. Não substitua seu arquivo `.env.local`.
