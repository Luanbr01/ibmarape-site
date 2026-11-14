# Igreja Batista do Marapé — Sanity CMS

## Passo 1: configurar uma conta
Acesse https://www.sanity.io/ e crie/acesse sua conta. Crie um projeto chamado **Igreja Batista do Marapé**, com dataset `production`, preferencialmente público para o conteúdo institucional.

Na página de gerenciamento do projeto (`https://www.sanity.io/manage`), copie o **Project ID** (não é senha). Não envie tokens privados, senhas ou chaves para ninguém.

## Passo 2: instalar este projeto
Extraia este ZIP numa pasta diferente da versão anterior ou faça backup da pasta anterior antes de copiar os novos arquivos. Abra a pasta `ibmarape-site` no VS Code. No terminal:

```powershell
npm install
```

## Passo 3: variáveis de ambiente
Na raiz do projeto, copie `.env.example` para `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=SEU_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
```

**Atenção:** o ID é uma informação pública. Não é necessário criar token para a leitura de conteúdo público nesta etapa. Não salve senhas ou tokens no repositório.

## Passo 4: CORS
Em https://www.sanity.io/manage, abra o projeto > API > CORS Origins (a posição exata varia conforme a interface) e adicione:

- `http://localhost:3000`
- Marque **Allow credentials** para o ambiente Studio local, quando solicitado.

Ao publicar, inclua o domínio real do site da igreja na mesma lista. Evite liberar origens `*` com credenciais.

## Passo 5: abrir o painel
```powershell
npm run dev
```

- Site público: http://localhost:3000
- Painel: http://localhost:3000/studio

Entre com a conta Sanity que tenha permissão de edição no projeto.

## Passo 6: primeiro cadastro de conteúdo
1. Em **Página inicial**, crie um documento e preencha "Frase principal" e "Imagem principal". Publique.
2. Cadastre um **Ministério** com nome, slug, imagem e descrição curta. Publique.
3. Volte em **Página inicial**, escolha os ministérios destacados e publique.
4. Cadastre uma **Mensagem**, com slug, capa e link de YouTube/Vimeo.
5. Em **Página inicial**, selecione a mensagem em destaque e publique.
6. Cadastre um **Evento** com título, slug, data e imagem.
7. Confira a homepage e as páginas `/ministerios`, `/mensagens` e `/eventos`.

As alterações publicadas normalmente aparecem após a revalidação de até 60 segundos configurada nas consultas. Durante essa fase, o site pode mostrar conteúdo demonstrativo quando documentos ainda não estiverem publicados.

## O que foi implementado
- Painel Sanity em `/studio`, sem cabeçalho, rodapé ou animações do site público.
- Documentos de página inicial, ministérios, mensagens e eventos.
- Consulta dos dados publicados pelo frontend sem token privado.
- Fotos e texto da homepage editáveis.
- Ministérios em destaque e mensagem destacada na homepage.
- Listagens e páginas simples de detalhes para conteúdos publicados.
- Estilos e animações originais preservados.

## Limitações desta etapa
- Ainda não há prévia visual de rascunhos nem edição diretamente na tela (Presentation Tool); isso será configurado numa etapa posterior com Draft Mode e permissões apropriadas.
- A seção de eventos usa uma imagem do primeiro evento se houver, mas não apresenta dados completos na homepage.
- A edição de conteúdo longo com Portable Text, SEO avançado e os demais módulos institucionais ficam para a próxima etapa.
- O projeto não teve compilação final validada neste ambiente; execute `npm run build` localmente antes de publicar.

## Resolução de problemas
- **Studio mostra "Sanity ainda não configurado"**: confira `.env.local` e reinicie `npm run dev`.
- **Mensagem de CORS**: cadastre exatamente `http://localhost:3000` na configuração do projeto.
- **Conteúdo não aparece**: verifique que o documento foi publicado e que o dataset configurado é o mesmo.
- **Página mostra conteúdo demonstrativo**: pode não haver documentos publicados ou a consulta pode estar temporariamente indisponível.
