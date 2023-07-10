---
title: How to make your browser talk in ONE line of code
description: Modern browsers APIs are making this kind of task super easy to achieve!
date: "2023-07-04"
tags: [ "javascript", "browser-api" ]
---

# How to make your browser talk in ONE line of code

## Modern browsers APIs are making this kind of task super easy to achieve!

Ok, I could have exaggerated a bit... But let's go straight to the point and then add some details.

**In order to make your browser talk, just write this line of code:**

```javascript
speechSynthesis.speak(new SpeechSynthesisUtterance('Hello!'));
```

How simple is that?! Many years ago it would have been unthinkable to do such a thing, but nowadays modern browsers give
you access to the new Web Speech API.

## Web Speech Api features

1. **Speech Synthesis API** (aka _text-to-speech_): is the ability of a machine to translate a text into spoken speech
   automatically, and it's the API I used to make the browser talk.
2. **Speech Recognition API** (aka _speech-to-text_): is the ability of a machine to identify words spoken aloud and
   convert them into readable text.

## Speech Synthesis

In order to make our browser speak, we use the **_SpeechSynthesisUtterance_** interface.

Firstly, we have to create a new SpeechSynthesisUtterance instance that accepts only one parameter (the sentence):

```javascript
const utterance = new SpeechSynthesisUtterance('Hello!')
```

There are a lot of _SpeechSynthesisUtterance_ properties we can manage:

- language (lang) &rarr; A string representing a BCP 47 language tag.
- speed (rate) &rarr; default=1, min=0.1, max=10
- pitch &rarr; default=1, min=0, max=2
- volume &rarr; default=1, min=0(mute), max=1

> If you want to explore other features of SpeechSynthesisUtterance you can browse
> the [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

Let's discover how we can "tune" the browser's voice:

```javascript
utterance.lang = 'en-US' // A string representing a BCP 47 language tag
utterance.rate = 0.5; // Represent the speed
utterance.pitch = 2;
utterance.volume = 0.5; // mute=0, max=1
```

And now, let the browser speak!

```javascript
speechSynthesis.speak(utterance);
```

### Events

We are also able to listen to a lot of events too:

- onstart
- onend
- onpause
- onresume
- onerror
- onmark (See [SSML mark tag](https://cloud.google.com/text-to-speech/docs/ssml))

Print out to the console once an event occurs:

```javascript
utterance.onstart = (event) => console.log('Speech has started', event);

utterance.onend = (event) => console.log('Speech has ended', event);
```

_Speech Syntesis_ is **well-supported** on major browsers, on the contrary _Speech Recognition_ is **partially supported
**.

> If you want to check whether your browser supports this feature, you can
> browse [caniuse.com](https://caniuse.com/?search=Web%20Speech%20API) to have more details.

**NB**: There are still some problems with "onpause" and "onresume", so use it carefully:

- https://github.com/WICG/speech-api/issues/82
- https://stackoverflow.com/questions/34877206/speechsynthesis-onpause-onresume-does-not-fire
- https://bugs.chromium.org/p/chromium/issues/detail?id=425553
- https://github.com/WICG/speech-api/issues/82

## Demo

Theory is useless without practice, thus I created
a [stackblitz project](https://stackblitz.com/edit/browser-api-text-to-speech?file=index.js) with a bunch of
_SpeechSynthesisUtterance_ features you can play with.
