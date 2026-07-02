---
title: Come far parlare il browser in UNA riga di codice
description: Le API dei browser moderni rendono questo tipo di task super semplice!
date: "2023-07-04"
tags: ["javascript", "browser-api"]
---

# Come far parlare il browser in UNA riga di codice

## Le API dei browser moderni rendono questo tipo di task super semplice!

Ok, forse ho un po' esagerato... ma andiamo dritti al punto e poi aggiungiamo i dettagli.

**Per far parlare il browser, basta scrivere questa riga di codice:**

```javascript
speechSynthesis.speak(new SpeechSynthesisUtterance("Hello!"));
```

Quanto è semplice?! Anni fa sarebbe stato impensabile, ma oggi i browser moderni ci danno accesso alla Web Speech API.

## Funzionalità della Web Speech API

1. **Speech Synthesis API** (aka _text-to-speech_): è la capacità di una macchina di trasformare automaticamente un testo in voce; è l'API che ho usato per far parlare il browser.
2. **Speech Recognition API** (aka _speech-to-text_): è la capacità di una macchina di riconoscere parole pronunciate ad alta voce e convertirle in testo leggibile.

## Speech Synthesis

Per far parlare il browser usiamo l'interfaccia **_SpeechSynthesisUtterance_**.

Per prima cosa dobbiamo creare una nuova istanza di SpeechSynthesisUtterance che accetta un solo parametro (la frase):

```javascript
const utterance = new SpeechSynthesisUtterance("Hello!");
```

Ci sono molte proprietà di _SpeechSynthesisUtterance_ che possiamo gestire:

- language (lang) &rarr; stringa che rappresenta un language tag BCP 47.
- speed (rate) &rarr; default=1, min=0.1, max=10
- pitch &rarr; default=1, min=0, max=2
- volume &rarr; default=1, min=0(mute), max=1

> Se vuoi esplorare altre funzionalità di SpeechSynthesisUtterance puoi consultare
> la [documentazione MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

Vediamo come possiamo "accordare" la voce del browser:

```javascript
utterance.lang = "en-US"; // stringa che rappresenta un language tag BCP 47
utterance.rate = 0.5; // velocità
utterance.pitch = 2;
utterance.volume = 0.5; // mute=0, max=1
```

E ora facciamo parlare il browser!

```javascript
speechSynthesis.speak(utterance);
```

### Eventi

Possiamo anche ascoltare diversi eventi:

- onstart
- onend
- onpause
- onresume
- onerror
- onmark (vedi [SSML mark tag](https://cloud.google.com/text-to-speech/docs/ssml))

Stampa in console quando avviene un evento:

```javascript
utterance.onstart = (event) => console.log("Speech has started", event);

utterance.onend = (event) => console.log("Speech has ended", event);
```

La _Speech Synthesis_ è **ben supportata** nei principali browser, mentre la _Speech Recognition_ è **solo parzialmente supportata**.

> Se vuoi verificare se il tuo browser supporta questa funzionalità, puoi
> consultare [caniuse.com](https://caniuse.com/?search=Web%20Speech%20API) per maggiori dettagli.

**NB**: ci sono ancora alcuni problemi con "onpause" e "onresume", quindi usali con attenzione:

- https://github.com/WICG/speech-api/issues/82
- https://stackoverflow.com/questions/34877206/speechsynthesis-onpause-onresume-does-not-fire
- https://bugs.chromium.org/p/chromium/issues/detail?id=425553
- https://github.com/WICG/speech-api/issues/82

## Demo

La teoria senza pratica serve a poco, quindi ho creato
un [progetto stackblitz](https://stackblitz.com/edit/browser-api-text-to-speech?file=index.js) con varie funzionalità di _SpeechSynthesisUtterance_ con cui puoi giocare.
