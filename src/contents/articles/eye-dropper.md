---
title: EyeDropper Browser API
description: How to open a color picker natively in the Browser 
date: "2023-08-21"
tags: [ "javascript", "browser-api" ]
---

# EyeDropper API

## How to open a color picker _natively_ in the Browser

```javascript
const eyeDropper = new EyeDropper();

try {
  const colorSelectionResult = await eyeDropper.open(); // It will wait until the user selects a color

  // This part is executed once the user has selected the color
  console.log(colorSelectionResult)
}
catch(ex) {
  // User has canceled the selection
}
```

The result is an object and this will be the result:

```
> { sRGBHex: "#433633" }
```

## Docs

> If you want to explore other features of _EyeDropper API_ you can browse
> the [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API).

## Browser support

**Note:** this API is marked as "experimental" and it seems to work on last versions of Chrome
and Edge only.

> If you want to check whether your browser supports this feature, you can
> browse [caniuse.com](https://caniuse.com/mdn-api_eyedropper) to have more details.

## Demo

Theory is useless without practice, thus I created
a [stackblitz project](https://stackblitz.com/edit/js-fzhgfp?file=index.js) to show how it works!
