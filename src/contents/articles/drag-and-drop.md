---
title: Drag & Drop API
description: How to deal with drag&drop in the Browser
date: "2023-09-08"
tags: [ "javascript", "browser-api" ]
---

# Drag&Drop API

👀 I have never used **drag&drop** functionality with vanilla JavaScript.

In the enterprise applications I work on every day, I usually rely on frameworks such as _Angular_, _React_, or _Vue_
that provide easier ways to handle it and, in addition, solve the classic problems that I would have to handle by hand.

💡 That's why I wanted to give it a try, developing a very basic project in HTML and JS.

Here, briefly, is what I figured out:

- In order to activate the dragging functionality on a element, it must be set the `draggable` attribute on it.

```html
<div class='item' draggable='true'>
  Drag me
</div>
```

- If we need to add some actions (e.g. save element's data for future purpose) once the element is "grabbed", a listener
  to the `dragStart` event must be added to it.

```html
<div id='my-item'
     class='item'
     draggable='true'
     ondragstart='handleDragStart(event)'
>
  Drag me
</div>

<script>
  function handleDragStart(e) {
    console.log('You are dragging ', e.target.id);
  }
</script>
```

- If we want to drop the selected element somewhere, we need to create one or more drop zones in the HTML.
  In order to create them, we need to make the target element listen to `dragOver` and `drop` events.

```html
<div class='dropzone'
     ondrop='handleDrop(event)'
     ondragover='handleDragOver(event)'
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

That's pretty much it!

## Demo

As usual, I created a [stackblitz project](https://stackblitz.com/edit/dz-drag-drop?file=index.js) where you can use
drag&drop to switch placements in a podium and choose which is the best 🏆 framework/library among Angular🥇, Vue🥈, and
React🥉! (Try to guess what my ranking is 😁)

And here is the link to the [demo](https://dz-drag-drop.stackblitz.io) if you just want to play with it!

P.S. I did not use the [dataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer) property,
but I will create a more "data-driven" demo to explain this function as well in the future.
