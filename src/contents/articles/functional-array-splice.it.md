---
title: Array.splice() in stile funzionale
description: Aggiungere/rimuovere elementi da un array senza modificare quello originale
date: "2023-07-10"
tags: ["javascript", "array", "functional-programming"]
---

# Splice funzionale

Secondo la [documentazione MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice),
il metodo `splice()` **_modifica_** il contenuto di un array rimuovendo o sostituendo elementi esistenti e/o aggiungendone di nuovi in-place.

## E se volessi farlo in modo funzionale?

Userei il metodo funzionale [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
in combinazione con la [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

L'idea è questa:

```javascript
const items = ["item1", "item2", "item3", "item4", "item5"];

const position = 3; // aka "array index"

const newItems = [
  ...items.slice(0, position),
  "NEW ITEM",
  ...items.slice(position),
];

// newItems = ['item1','item2','item3','NEW ITEM','item4','item5'];
// items = ['item1', 'item2', 'item3', 'item4', 'item5'];
```

## Funzione riutilizzabile

Ecco l'implementazione come funzione con le stesse caratteristiche del metodo `splice()`:

```javascript
const functionalSplice = (items, position, deleteCount, ...newItems) => [
  ...items.slice(0, position),
  ...newItems,
  ...items.slice(position + deleteCount),
];

const items = ["item1", "item2", "item3", "item4", "item5"];

const newItems_pos3 = functionalSplice(
  items,
  3,
  0,
  "NEW ITEM middle 1",
  "NEW ITEM middle 2",
);
// ['item1', 'item2', 'item3', 'NEW ITEM middle 1', 'NEW ITEM middle 2', 'item4', 'item5']

const newItems_start = functionalSplice(items, 0, 1, "NEW ITEM start");
// ['NEW ITEM start', 'item2', 'item3', 'item4', 'item5']
```

### E se volessi aggiungere un elemento in fondo all'array?

La soluzione è usare `Infinity` (oppure `items.length`, ma `Infinity` è più semplice!).

```javascript
const newItems_end = functionalSplice(items, Infinity, 0, "NEW ITEM end");
// ['item1', 'item2', 'item3', 'item4', 'item5', 'NEW ITEM end']
```

## `Array.functionalSplice()`

Ecco l'implementazione come funzione nel prototype di Array, mantenendo la stessa signature di `splice()`:

```javascript
Array.prototype.functionalSplice = function (
  position,
  deleteCount,
  ...newItems
) {
  return [
    ...this.slice(0, position),
    ...newItems,
    ...this.slice(position + deleteCount),
  ];
};

const items = ["item1", "item2", "item3", "item4", "item5"];

const newItems_pos3 = items.functionalSplice(
  3,
  0,
  "NEW ITEM middle 1",
  "NEW ITEM middle 2",
);
// ['item1', 'item2', 'item3', 'NEW ITEM middle 1', 'NEW ITEM middle 2', 'item4', 'item5']
```

## Splice funzionale moderno: `toSpliced()` in soccorso!

JavaScript ha introdotto un nuovo metodo Array chiamato [`toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced),
che risolve finalmente il problema.
La signature è identica a `splice()`, ma **ritorna una copia** dell'array originale.

> Se vuoi verificare se il tuo browser supporta questa funzionalità, puoi
> consultare [caniuse.com](https://caniuse.com/mdn-javascript_builtins_array_tospliced) per maggiori dettagli.

# Demo

Ho creato una [demo su stackblitz](https://stackblitz.com/edit/js-9kgbh7?file=index.js) se vuoi provarla.
