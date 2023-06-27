---
title: JavaScript has no sleep function
description: ...but we can easily solve it this way!
date: "2023-06-21"
tags: [ "javascript" ]
---

# JavaScript has no sleep function, but we can easily solve it this way!

**In order to make your browser sleep, just write this line of code:**

```javascript
await new Promise(_ => setTimeout(_, 2000));
```

_This will make the browser sleep for 2 seconds (2000ms)._

> Please note that it works in modern browsers only (> 2017)! See browser compatibility for _await_ on [caniuse.com](https://caniuse.com/?search=await).

## Let's create a reusable sleep function

```javascript
const sleep = (ms = 2000) => new Promise(_ => setTimeout(_, ms));
```

Or with a more _old days'_ notation:

```javascript
function sleep(ms = 2000) { 
  return new Promise(function(_) {
    return setTimeout(_, ms)
  });
}
```

> If you want to explore other features of _Promise_ you can browse the [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### How to use it

```javascript
console.log(`Let's wait for 5s`);

await sleep(5000); // 5000ms = 5seconds

console.log(`5s have passed`);
```

Result in console:

```
> Let's wait for 5s
[waiting for 5 seconds]
> 5s have passed 
```

### Top-level await issue

Using _top-level await_ might not work in some old browser/node versions. To solve this problem we can wrap our code
with an _immediately-invoked async function_.

```javascript
(async function() {

  console.log(`Let's wait for 5s`);

  await sleep(5000);

  console.log(`5s have passed`);

}());  
```

## Sleep function in old browsers

Just a note about _Sleep_ function in old browser: it has usually been written this way, but it's definitely not
"performance friendly".

```javascript
function sleep(mss) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while(
    currentDate - date < milliseconds);
}
```

## Demo

I created a [stackblitz project](https://stackblitz.com/edit/sleep-function?file=index.js) with a simple example.
