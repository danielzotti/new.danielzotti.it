---
title: Web Workers
description: Running heavy tasks without interfere with the main UI thread
date: "2023-09-21"
tags: [ "javascript", "browser-api" ]
---

# Web Workers

**[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)** are a powerful feature in modern web
development, enabling JavaScript to run concurrently in the _background without blocking the main user interface
thread_.

In the **traditional web development** model, JavaScript code executes on the _same thread as the user interface_. This
means that computationally intensive tasks, such as complex calculations, data processing, or network requests, can
significantly slow down the user experience. Users may encounter **unresponsive web pages or even complete freezes when
a script monopolizes the CPU**.

**Web Workers** address this problem by introducing a **multi-threaded approach to JavaScript** execution *
*_within the browser_**. With them, you can create separate threads that run concurrently alongside the main application
thread.

## Key points to understand Web Workers

- **File**: Web Workers are just JavaScript files loaded by the main thread.

- **Concurrency**: Web Workers provide true concurrency by executing JavaScript code in parallel.

- **Isolation**: Each Web Worker runs in isolation from the main thread and other workers. They have their own global
  scope, which means they cannot directly access variables or functions defined in the main thread or other workers.

- **Communication**: Communication between workers and the main thread is achieved through message
  passing ([`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)), ensuring data
  integrity and safety.

- **Background Processing**: Web Workers are ideal for offloading resource-intensive operations like data parsing, image
  processing, or lengthy computations to prevent them from affecting the user experience.

- **No UI Access**: Web Workers are unable to access the Document Object Model (DOM) directly, as they run outside the
  main thread. This limitation ensures that UI operations remain exclusive to the main thread, preventing potential
  conflicts and race conditions.

- **Browser Support**: Web Workers are [widely supported in modern browsers](https://caniuse.com/webworkers), making
  them a viable technology for a broad range of web applications. However, it's essential to check browser compatibility
  when implementing a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) in your projects.

Ok, too much chat... Let's dive into the code as usual!

## Web Worker support

First of all. We need to make sure that the browser supports Web Workers. We do this by checking if
the [`Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker) instance is present in the window object:

```javascript
// index.js
if (!window.Worker) {
  console.log(`Your browser doesn't support Web Workers!`);
  return;
}
```

## Web Worker creation

To use a Web Worker, simply create a new instance of a `Worker`, passing the **URL** of the associated _file_ as an
argument:

```javascript
// index.js
const worker = new Worker('./worker.js');
```

## Prepare the communication with the Web Worker

To "connect" main thread with the Web Worker we need to listen to the messages the Web Worker might send using its
exposed methods:

```javascript
// index.js
worker.onerror = (error) => {
  // when an error occurs in the worker
};

worker.onmessage = (event) => {
  // everytime a worker use `postMessage` to send a message
}

worker.onmessageerror = (event) => {
  // e.g. the message from the worker can't be serialized
}
```

## Communication

In order to communicate with the web worker _from the main thread_, we just push a message using
the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method of the `Worker`:

```javascript
// index.js
worker.postMessage({ message: 'Do something' });
```

...and inside the worker we listen to the [`message`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) and
read the `data` property:

```javascript
// worker.js
addEventListener('message', function(event) {
  console.log(event.data); // { message: 'Do something'}
})
```

We can do the other way round by calling the `postMessage` inside the worker:

```javascript
// worker.js
postMessage({ message: 'A message from the worker!' });
```

...and react to the message event in the main thread using the `onmessage` method of the worker instance:

```javascript
// index.js
worker.onmessage = (event) => {
  console.log(event.data); // { message: 'A message from the worker!'}
}
```

## The whole code

Let's recap the basic code for the two files.

### Main thread

```javascript
// index.js
if (!window.Worker) {
  console.log(`Your browser doesn't support Web Workers!`);
  return;
}

const worker = new Worker('./worker.js');

worker.onerror = (error) => { 
  // ...
};

worker.onmessage = (event) => {
  // ...
}

worker.onmessageerror = (event) => {
  // ...
}

worker.postMessage({ message: 'Do something' });
```

### Web Worker

```javascript
// worker.js
addEventListener('message', function(event) {
  if (event.data === 'Do something') {
    postMessage({ message: `Ok, I'll do!` });
  } else {
    console.log(`I won't do anything...`);
  }
})
```

> NB: `postMessage` is the only way the Web Worker can comunicate with the main thread and viceversa!

## Demo

And as always, can't miss the [demo](https://web-workers-playground.danielzotti.it/) and open
source [project](https://github.com/danielzotti/web-workers-playground) on GitHub!

The project guides the user through a series of steps to follow, and the idea is to show the _difference_ between a *
*long-running task** performed by the _main thread_ (which blocks the UI) and one performed by a _web worker_.

![Web Workers Playground preview](/static/images/articles/web-workers/web-workers-demo.png)

To _simulate_ a long-running task I used this simple code:

```javascript
function longTask(max) {
  let sum = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    sum += i;
  }
  return sum;
}
```
