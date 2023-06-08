---
title: Functional splice()
description: Add/Remove items in array without changing the original one
date: "2023-06-08"
tags: [ "javascript" ]
---

# Functional splice

According to [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice):
The `splice()` method **_changes_** the contents of an array by removing or replacing existing elements and/or adding
new elements in place.

## What if I wanted to do it in a functional way?

I would use the
functional [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
method in combination
with [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Here is the idea:

```javascript
const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const position = 3; // aka "array index"

const newItems = [
    ...items.slice(0, position),
    'NEW ITEM',
    ...items.slice(position)
];

// newItems = ['item1','item2','item3','NEW ITEM','item4','item5'];
// items = ['item1', 'item2', 'item3', 'item4', 'item5'];
```

## Reusable function

Here is the implementation as a function with the same features of the `splice()` method:

```javascript
const functionalSplice = (items, position, deleteCount, ...newItems) => ([
    ...items.slice(0, position),
    ...newItems,
    ...items.slice(position + deleteCount)
]);

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const newItems_pos3 = functionalSplice(3, 0, 'NEW ITEM middle 1', 'NEW ITEM middle 2');
// ['item1', 'item2', 'item3', 'NEW ITEM middle 1', 'NEW ITEM middle 2', 'item4', 'item5']

const newItems_start = functionalSplice(items, 0, 1, 'NEW ITEM start');
// ['NEW ITEM start', 'item2', 'item3', 'item4', 'item5']
```

### What if I wanted to add an item at the end of the array?

The solution is using `Infinity` (or `items.length`, but `Infinity` is easier!)

```javascript
const newItems_end = functionalSplice(items, Infinity, 0, 'NEW ITEM end');
// ['item1', 'item2', 'item3', 'item4', 'item5', 'NEW ITEM end']
```

## `Array.functionalSplice()`

Here is the implementation as a function in the Array prototype, mimicking the `splice()` signature:

```javascript
Array.prototype.functionalSplice = function (position, deleteCount, ...newItems) {
    return [
        ...this.slice(0, position),
        ...newItems,
        ...this.slice(position + deleteCount)
    ]
};

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const newItems_pos3 = items.functionalSplice(3, 0, 'NEW ITEM middle 1', 'NEW ITEM middle 2');
// ['item1', 'item2', 'item3', 'NEW ITEM middle 1', 'NEW ITEM middle 2', 'item4', 'item5']
console.log(items, newItems_pos3)
```

## Modern functional splice: `toSpliced()` to the rescue!

JavaScript added a new Array method
called [`toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
that finally solves the problem.
The signature is identical to the `splice()` method, but it **returns a copy** of the original array.

> If you want to check whether your browser supports this feature, you can
> browse [caniuse.com](https://caniuse.com/mdn-javascript_builtins_array_tospliced) to have more details.
