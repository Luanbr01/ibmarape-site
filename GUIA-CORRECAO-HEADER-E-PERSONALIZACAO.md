# IBM — Correção do cabeçalho e personalização no Sanity

## O que mudou

- `src/app/(website)/layout.tsx`: o Header agora é irmão do wrapper do conteúdo, não filho. Isso o isola das camadas do hero e das animações.
- `src/app/globals.css`: o cabeçalho utiliza z-index elevado; um tamanho de título mobile que estava fixo em 47px agora usa a variável do Sanity.
- `src/sanity/queries.ts`: configurações são lidas da API diretamente sem cache para que apareçam no próximo refresh após Publicar.
- `src/sanity/schemaTypes.ts`: explicações com exemplos concretos nos cinco controles.

## Como instalar

1. Faça backup do projeto atual.
2. Copie os quatro arquivos atualizados para os mesmos caminhos, sem mexer no `.env.local`.
3. Pare e reinicie `npm run dev`.
4. No Studio, abra **Personalização do site**, altere um valor e clique **Publish/Publicar**.
5. Recarregue `http://localhost:3000` com `Ctrl+Shift+R`. Para testar animações, comece no topo e role.

## Testes recomendados

- Hero: diminuir título para 40px e depois aumentar para 90px. Em telas menores o efeito é limitado pelo tamanho responsivo.
- Títulos de seção: experimentar 30px e 70px; confira também a seção Ministérios no celular.
- Animação: testar 0.3s e 1.5s, sempre recarregando antes de rolar.
- Movimento: testar 0px e 80px.
- Espaçamento: testar 60px e 150px; observe distâncias verticais em Bem-vindo e Eventos.

Se o cabeçalho continuar invisível: abra o Console do navegador e execute `document.querySelector('.site-header')?.getBoundingClientRect()` e `getComputedStyle(document.querySelector('.site-header')).zIndex` e envie o resultado. Também confira se o arquivo `Header.tsx` está presente e se o `layout.tsx` atualizado foi substituído.

## Observação

Os ajustes não mudam a duração do vídeo, a velocidade do Lenis ou a fonte do cabeçalho. Use o painel para as cinco opções descritas.
