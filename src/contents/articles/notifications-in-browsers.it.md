---
title: Notifiche nel browser
description: Come gestire notifiche locali e push
date: "2023-09-15"
tags: ["javascript", "browser-api"]
---

# Notifiche nel browser

Quanto sarebbe comodo avere notifiche nei browser come in una normale app mobile?

> **_Beh, ce le abbiamo già!_**

Ci sono solo alcuni concetti da padroneggiare prima di iniziare:

1. Supporto browser
2. Permessi per le notifiche
3. Service Worker

## Il browser lo supporta?

Per prima cosa dobbiamo verificare se il browser supporta `Notification` e `serviceWorker`.
Senza queste funzionalità non possiamo gestire le notifiche!

Basta scrivere:

```javascript
if (!("serviceWorker" in navigator)) {
  throw new Error("No Service Worker support");
}
if (!("Notification" in window)) {
  throw new Error("No Notification support");
}
```

NB: vale per qualsiasi feature del browser.

## Permessi notifiche

Per attivare le notifiche su uno specifico dispositivo, bisogna chiedere all'utente se vuole riceverle.

```javascript
Notification.requestPermission();
```

Comparirà un popup nel browser che chiede la risposta dell'utente...

![Notification Permissions Request](/static/images/articles/notifications-in-browsers/request-permissions.png)

...e la nostra applicazione deve gestire la scelta così:

```javascript
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    // L'utente ha cliccato su "Allow"
    // Il browser PUÒ inviare notifiche
  } else if (permission === "denied") {
    // L'utente ha cliccato su "Block"
    // Il browser NON PUÒ inviare notifiche
  } else if (permission === "default") {
    // L'utente ha chiuso il popup
    // possiamo chiedere i permessi di nuovo se vogliamo!
  }
});
```

Ok, ora potremmo essere pronti a inviare la prima notifica, ma prima parliamo di Service Worker!

## Service Worker

Secondo [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), i **Service Worker** agiscono essenzialmente come **_proxy server_** tra web app, browser e rete (quando disponibile).

In pratica, un `ServiceWorker` è un **file JavaScript** che gira in _background_ su un _thread separato_.
Deve prima essere registrato (installato), poi può comunicare con l'app (NB: `https` è obbligatorio!).

Perché ci serve un ServiceWorker per inviare notifiche?
Perché gira in background anche quando la pagina dell'app non è aperta nel browser!
E soprattutto perché [`ServiceWorkerRegistration`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) ha un metodo `showNotification` usato per mostrare la notifica sul dispositivo.

## Inviare una notifica

Dobbiamo solo aspettare che il service worker sia pronto e chiamare il metodo passando il titolo della notifica come primo parametro.

```javascript
navigator.serviceWorker.ready.then((swRegistration) => {
  swRegistration.showNotification("My First notification!");
});
```

Queste poche righe mostreranno la notifica:

![Notification popup on a Mac](/static/images/articles/notifications-in-browsers/notifications-mac.jpeg)

## Proprietà delle notifiche

Il metodo [`showNotification`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) ha un secondo argomento che accetta un oggetto di opzioni per personalizzare la notifica:

- `icon`: URL di un'immagine mostrata accanto al titolo della notifica
- `image`: URL di un'immagine mostrata come contenuto della notifica
- `actions`: array di azioni che diventano una lista di pulsanti cliccabili sotto al contenuto della notifica
- `action`: stringa univoca che rappresenta l'ID dell'azione
- `title`: stringa human readable da visualizzare
- `icon`: URL dell'immagine accanto al titolo
- `body`: stringa con contenuto aggiuntivo da mostrare nella notifica
- `badge`: stringa con URL di un'immagine che rappresenta la notifica quando non c'è spazio sufficiente per mostrarla per intero (ad esempio nella barra notifiche Android)
- `data`: dati arbitrari che vuoi associare alla notifica
- `tag`: ID della notifica che consente di trovarla, sostituirla o rimuoverla via script quando necessario
- `silent`: se `true`, niente vibrazione o suono
- `vibrate`: array di numeri che rappresenta il pattern di vibrazione
- ...e molte altre!

## Notifica "come back"

Proviamo a creare insieme una notifica "come back" che compare quando l'app perde il focus e si chiude automaticamente quando torna in focus.
Inoltre, se cliccata, riporta l'utente all'app.

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    navigator.serviceWorker.ready.then(async (registration) => {
      await registration.showNotification("Come baaaaack!", {
        body: `Click here and come back to the website!`,
        silent: true,
        tag: "come-back", // richiesto se silent è true
      });
      registration.addEventListener("click", (e) => {
        e.preventDefault();
        window.parent.focus();
      });
    });
  } else {
    navigator.serviceWorker.ready.then((registration) => {
      registration
        .getNotifications({
          tag: "come-back",
        })
        .then((notifications) => {
          notifications.forEach((n) => {
            n.close();
          });
        });
    });
  }
});
```

## Notifiche senza ServiceWorker

"_Come?! Hai appena detto che i ServiceWorker sono necessari per inviare notifiche!!_"
Lo so... in realtà esiste un metodo alternativo che non coinvolge `ServiceWorker`, ma si basa su una feature deprecata!
Il costruttore [`window.Notification`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) non è segnato come deprecato in generale, ma è deprecato in Chrome su Android, quindi non funzionerà sui dispositivi mobile.
Per questo ho preferito usare direttamente l'approccio con ServiceWorker.

Ti lascio comunque un esempio, può essere utile a chi non ha bisogno del supporto mobile.

## Metodo "OLD": costruttore Notification

Ricreiamo la notifica "come back" usando il costruttore `Notification`.

```javascript
let comeBackNotification;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    comeBackNotification = new Notification("Come baaaaack!");

    comeBackNotification.addEventListener("close", (e) => {
      console.log("Notification CLOSED!", e.target.data);
    });

    comeBackNotification.addEventListener("click", (e) => {
      console.log("Notification CLICKED!", e.target.data);
      e.preventDefault();
      window.parent.focus();
    });
  } else {
    comeBackNotification.close();
  }
});
```

## Utile da sapere

- Da Chrome 49, le notifiche non funzionano in incognito mode.
- `notification.vibrate` non funziona su Android > 8.0
- `sw.js`, se non ci serve, può anche essere un file vuoto!
- Chrome per Android richiede la chiamata tramite registrazione service worker
- iOS richiede che il sito venga prima aggiunto alla Home Screen

### Wait Until

Una cosa importante sui service worker è che hai poco controllo su _quando_ il loro codice verrà eseguito.
È il browser a decidere quando avviarli e quando terminarli.
L'unico modo per dire al browser di aspettare è passare una promise a `event.waitUntil()`.
Così il browser terrà il service worker attivo finché la promise non sarà risolta o rifiutata.

```javascript
// file: `sw,js`
self.addEventListener("push", function (event) {
  const promiseChain = self.registration.showNotification("Push Notification");
  event.waitUntil(promiseChain);
});
```

## Push Notifications (da server remoto)

La differenza essenziale tra _notifiche locali_ e _push notifications_ è semplice:

- **Notifiche locali**: pianificate localmente dall'app e _consegnate dallo stesso dispositivo_.

- **Push notifications**: inviate da un _server remoto_ che le recapita ai dispositivi su cui è installata l'app.

Non parlerò della parte server, quindi spiego come simulare una Push Notification con Chrome DevTools.

### Simulare una Push Notification con Chrome DevTools

- Apri Chrome DevTools
- Vai nella tab `Application`
- Seleziona `Service Workers` a sinistra
- Scrivi un messaggio personalizzato a destra e clicca `Push`

![Test Push Notification message on Chrome DevTools](/static/images/articles/notifications-in-browsers/service-worker-developer-tools.png)

## Demo

Come sempre, ho creato una [demo](https://push-notifications-playground.danielzotti.it) e
un [progetto GitHub](https://github.com/danielzotti/push-notifications-local).

Durante l'uso della demo, controlla la `console` per maggiori informazioni.
