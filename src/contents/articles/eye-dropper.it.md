---
title: API EyeDropper del browser
description: Come aprire un color picker nativo nel browser
date: "2023-08-21"
tags: ["javascript", "browser-api"]
---

# API EyeDropper

## Come aprire un color picker _nativo_ nel browser

```javascript
const eyeDropper = new EyeDropper();

try {
  const colorSelectionResult = await eyeDropper.open(); // Attende finché l'utente non seleziona un colore

  // Questa parte viene eseguita quando l'utente ha selezionato il colore
  console.log(colorSelectionResult);
} catch (ex) {
  // L'utente ha annullato la selezione
}
```

Il risultato è un oggetto e avrà questa forma:

```
> { sRGBHex: "#433633" }
```

## Documentazione

> Se vuoi esplorare altre funzionalità della _EyeDropper API_, puoi consultare
> la [documentazione MDN](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API).

## Supporto browser

**Nota:** questa API è marcata come "experimental" e sembra funzionare solo sulle versioni più recenti di Chrome ed Edge.

> Se vuoi verificare se il tuo browser supporta questa funzionalità, puoi
> consultare [caniuse.com](https://caniuse.com/mdn-api_eyedropper) per maggiori dettagli.

## Demo

La teoria senza pratica non serve a molto, quindi ho creato
un [progetto stackblitz](https://stackblitz.com/edit/js-fzhgfp?file=index.js) per mostrarne il funzionamento!
