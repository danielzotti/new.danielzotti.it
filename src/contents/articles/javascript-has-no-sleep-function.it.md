---
title: JavaScript non ha una funzione sleep
description: ...ma possiamo risolvere facilmente in questo modo!
date: "2023-06-21"
tags: ["javascript"]
---

# JavaScript non ha una funzione sleep, ma possiamo risolvere facilmente così!

**Per far "dormire" il browser, ti basta scrivere questa riga di codice:**

```javascript
await new Promise((_) => setTimeout(_, 2000));
```

_Questo farà dormire il browser per 2 secondi (2000ms)._

> Nota: funziona solo nei browser moderni (> 2017)! Vedi la compatibilità di _await_ su [caniuse.com](https://caniuse.com/?search=await).

## Creiamo una funzione sleep riutilizzabile

```javascript
const sleep = (ms = 2000) => new Promise((_) => setTimeout(_, ms));
```

Oppure con una sintassi più "vecchia scuola":

```javascript
function sleep(ms = 2000) {
  return new Promise(function (_) {
    return setTimeout(_, ms);
  });
}
```

> Se vuoi esplorare altre funzionalità di _Promise_, puoi consultare la [documentazione MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### Come usarla

```javascript
console.log(`Let's wait for 5s`);

await sleep(5000); // 5000ms = 5seconds

console.log(`5s have passed`);
```

Risultato in console:

```
> Let's wait for 5s
[waiting for 5 seconds]
> 5s have passed
```

### Problema del top-level await

Usare _top-level await_ potrebbe non funzionare in alcune versioni vecchie di browser/node.
Per risolvere possiamo wrappare il codice in una _immediately-invoked async function_.

```javascript
(async function () {
  console.log(`Let's wait for 5s`);

  await sleep(5000);

  console.log(`5s have passed`);
})();
```

## Sleep function nei browser vecchi

Solo come nota: in passato la funzione _sleep_ veniva spesso scritta così, ma non è per niente "performance friendly".

```javascript
function sleep(mss) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
```

## Demo

Ho creato un [progetto stackblitz](https://stackblitz.com/edit/sleep-function?file=index.js) con un esempio semplice.
