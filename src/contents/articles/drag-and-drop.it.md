---
title: API Drag & Drop
description: Come gestire il drag&drop nel browser
date: "2023-09-08"
tags: ["javascript", "browser-api"]
---

# API Drag&Drop

👀 Non avevo mai usato la funzionalità **drag&drop** con JavaScript vanilla.

Nelle applicazioni enterprise su cui lavoro ogni giorno di solito mi affido a framework come _Angular_, _React_ o _Vue_,
che offrono modalità più semplici per gestirla e, in più, risolvono i classici problemi che altrimenti dovrei affrontare a mano.

💡 Per questo ho voluto provarla creando un progettino molto base in HTML e JS.

Ecco, in breve, cosa ho scoperto:

- Per attivare il trascinamento su un elemento bisogna impostare l'attributo `draggable`.

```html
<div class="item" draggable="true">Drag me</div>
```

- Se vogliamo eseguire azioni (es. salvare i dati dell'elemento) quando viene "agganciato", dobbiamo aggiungere un listener all'evento `dragStart`.

```html
<div
  id="my-item"
  class="item"
  draggable="true"
  ondragstart="handleDragStart(event)"
>
  Drag me
</div>

<script>
  function handleDragStart(e) {
    console.log("You are dragging ", e.target.id);
  }
</script>
```

- Se vogliamo rilasciare l'elemento selezionato da qualche parte, dobbiamo creare una o più drop zone in HTML.
  Per farlo, l'elemento target deve ascoltare gli eventi `dragOver` e `drop`.

```html
<div
  class="dropzone"
  ondrop="handleDrop(event)"
  ondragover="handleDragOver(event)"
>
  Drop the dragging element here!
</div>

<script>
  function handleDrop(e) {
    e.preventDefault(); // prevent default action (e.g. open as link for some elements)
    // CODE HERE (e.g. append element to the drop zone)
  }

  function handleDragOver(e) {
    e.preventDefault(); // Required to allow Drop event
  }
</script>
```

Questo è praticamente tutto!

## Demo

Come sempre, ho creato un [progetto stackblitz](https://stackblitz.com/edit/dz-drag-drop?file=index.js) in cui puoi usare il drag&drop per cambiare posizione su un podio e scegliere quale sia il miglior framework/libreria 🏆 tra Angular🥇, Vue🥈 e React🥉! (Prova a indovinare la mia classifica 😁)

E qui c'è il link alla [demo](https://dz-drag-drop.stackblitz.io) se vuoi solo provarla!

P.S. Non ho usato la proprietà [dataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer), ma in futuro farò una demo più "data-driven" per spiegare anche quella.
