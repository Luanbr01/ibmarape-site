# Correção proposta para testar o cabeçalho

O código no GitHub mantém `<Header />` no layout e define `.site-header` como `position: fixed`.
Não foi possível reproduzir a renderização local ou confirmar a causa visual; esta alteração reforça a camada do cabeçalho.

- `.site-header`: `z-index: 9999`, `isolation: isolate` e `pointer-events: auto`.
- `.website-shell`: `isolation: isolate`.
- `.hero`: `z-index: 0`.

Substitua somente `src/app/globals.css` no seu projeto atual. Não substitua `.env.local`.
Pare e reinicie o servidor com `npm run dev`, atualize com Ctrl+Shift+R.
Se o problema persistir, abra o console e execute:

```js
const h = document.querySelector('.site-header');
console.log(h, h && {rect:h.getBoundingClientRect().toJSON(), style:{display:getComputedStyle(h).display,opacity:getComputedStyle(h).opacity,visibility:getComputedStyle(h).visibility,zIndex:getComputedStyle(h).zIndex}});
```

Esse diagnóstico distingue ausência do componente de ocultação por CSS.
