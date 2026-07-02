---
title: Web Workers
description: Eseguire task pesanti senza interferire con il thread UI principale
date: "2023-09-21"
tags: ["javascript", "browser-api"]
---

# Web Workers

I **[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)** sono una funzionalità potente del web moderno, che consente a JavaScript di eseguire codice in parallelo _in background senza bloccare il thread principale dell'interfaccia utente_.

Nel modello **tradizionale di sviluppo web**, il codice JavaScript gira sullo _stesso thread della UI_.
Questo significa che attività computazionalmente intensive, come calcoli complessi, elaborazione dati o richieste di rete, possono rallentare molto l'esperienza utente.
Gli utenti possono ritrovarsi con **pagine non responsivi o persino freeze completi quando uno script monopolizza la CPU**.

I **Web Workers** risolvono questo problema introducendo un approccio **multi-thread** all'esecuzione JavaScript _all'interno del browser_.
Con loro puoi creare thread separati che lavorano in parallelo rispetto al thread principale dell'applicazione.

## Punti chiave per capire i Web Workers

- **File**: i Web Workers sono semplicemente file JavaScript caricati dal thread principale.

- **Concorrenza**: i Web Workers forniscono vera concorrenza eseguendo codice JavaScript in parallelo.

- **Isolamento**: ogni Web Worker gira isolato dal thread principale e dagli altri worker. Ha un proprio scope globale, quindi non può accedere direttamente a variabili o funzioni definite nel thread principale o in altri worker.

- **Comunicazione**: la comunicazione tra worker e thread principale avviene tramite passaggio di messaggi ([`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)), garantendo integrità e sicurezza dei dati.

- **Elaborazione in background**: i Web Workers sono ideali per delegare operazioni pesanti come parsing di dati, elaborazione immagini o calcoli lunghi, così da non impattare l'esperienza utente.

- **Nessun accesso alla UI**: i Web Workers non possono accedere direttamente al DOM, perché girano fuori dal thread principale. Questa limitazione mantiene le operazioni UI esclusive del main thread, evitando conflitti e race condition.

- **Supporto browser**: i Web Workers sono [ampiamente supportati nei browser moderni](https://caniuse.com/webworkers), quindi sono una tecnologia valida per molte web app. In ogni caso, è sempre bene verificare la compatibilità quando si usa [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) nei propri progetti.

Ok, basta teoria... andiamo sul codice come sempre!

## Supporto Web Worker

Prima di tutto, dobbiamo assicurarci che il browser supporti i Web Workers.
Lo facciamo verificando che l'istanza [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) sia presente nell'oggetto window:

```javascript
// index.js
if (!window.Worker) {
  console.log(`Your browser doesn't support Web Workers!`);
  return;
}
```

## Creazione del Web Worker

Per usare un Web Worker basta creare una nuova istanza di `Worker`, passando come argomento la **URL** del _file_ associato:

```javascript
// index.js
const worker = new Worker("./worker.js");
```

## Preparare la comunicazione con il Web Worker

Per "collegare" main thread e Web Worker, dobbiamo ascoltare i messaggi che il worker può inviare usando i metodi esposti:

```javascript
// index.js
worker.onerror = (error) => {
  // quando si verifica un errore nel worker
};

worker.onmessage = (event) => {
  // ogni volta che il worker usa `postMessage` per inviare un messaggio
};

worker.onmessageerror = (event) => {
  // ad esempio il messaggio dal worker non può essere serializzato
};
```

## Comunicazione

Per comunicare col web worker _dal thread principale_, basta inviare un messaggio con il metodo [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) del `Worker`:

```javascript
// index.js
worker.postMessage({ message: "Do something" });
```

...e dentro al worker ascoltiamo l'evento [`message`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) e leggiamo la proprietà `data`:

```javascript
// worker.js
addEventListener("message", function (event) {
  console.log(event.data); // { message: 'Do something'}
});
```

Possiamo fare anche il contrario chiamando `postMessage` dentro il worker:

```javascript
// worker.js
postMessage({ message: "A message from the worker!" });
```

...e reagire al messaggio nel thread principale usando `onmessage` dell'istanza worker:

```javascript
// index.js
worker.onmessage = (event) => {
  console.log(event.data); // { message: 'A message from the worker!'}
};
```

## Codice completo

Ricapitoliamo il codice base dei due file.

### Main thread

```javascript
// index.js
if (!window.Worker) {
  console.log(`Your browser doesn't support Web Workers!`);
  return;
}

const worker = new Worker("./worker.js");

worker.onerror = (error) => {
  // ...
};

worker.onmessage = (event) => {
  // ...
};

worker.onmessageerror = (event) => {
  // ...
};

worker.postMessage({ message: "Do something" });
```

### Web Worker

```javascript
// worker.js
addEventListener("message", function (event) {
  if (event.data === "Do something") {
    postMessage({ message: `Ok, I'll do!` });
  } else {
    console.log(`I won't do anything...`);
  }
});
```

> NB: `postMessage` è l'unico modo con cui il Web Worker può comunicare con il thread principale e viceversa!

## Demo

E come sempre non può mancare la [demo](https://web-workers-playground.danielzotti.it/) e il [progetto](https://github.com/danielzotti/web-workers-playground) open source su GitHub!

Il progetto guida l'utente in una serie di step e l'idea è mostrare la _differenza_ tra un **task long-running** eseguito dal _main thread_ (che blocca la UI) e uno eseguito da un _web worker_.

> NB: **_Le performance sono le stesse, ma con il Web Worker la UI rimane usabile._**

![Web Workers Playground preview](/static/images/articles/web-workers/web-workers-demo.png)

Per _simulare_ un task long-running ho usato questo codice semplice:

```javascript
function longTask(max) {
  let sum = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    sum += i;
  }
  return sum;
}
```
