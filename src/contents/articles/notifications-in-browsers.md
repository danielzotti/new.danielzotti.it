---
title: Notification in Browsers
description: How to deal with local and push notifications
date: "2023-09-15"
tags: [ "javascript", "browser-api" ]
---

# Notification in Browsers

How nice would it be to have notifications in browsers like a regular mobile application?

> **_Well, we already have it!_**

There are just a couple of concepts we need to master before start:

1. Browser support
2. Notifications permissions
3. Service Workers

## Does the browser support it?

First of all, we need to check if the browser supports the `Notification` and the `serviceworker` features. Without
these services we cannot manage notifications!

It is as easy as typing:

```javascript
if (!('serviceWorker' in navigator)) {
  throw new Error('No Service Worker support')
}
if (!("Notification" in window)) {
  throw new Error('No Notification support')
}
```

NB: This applies to any browser feature.

## Notifications permissions

In order to activate notifications on a specific device, the user must be asked if they want to receive notifications.

```javascript
Notification.requestPermission()
```

An alert will pop up in the browser asking the user to respond...

![Notification Permissions Request](/static/images/articles/notifications-in-browsers/request-permissions.png)

...and our application must handle the user's choice in this way:

```javascript
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    // The user clicked on "Allow" button
    // Browser CAN send notifications
  } else if (permission === "denied") {
    // The user clicked on "Block" button
    // Browser CANNOT send notifications
  } else if (permission === "default") {
    // The user closed the popup
    // we can ask for permissions again if we want!
  }
});
```

Okay, now we may be ready to send our first notification to the user, but first let's talk about ServiceWorker!

## ServiceWorker

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) **Service Workers** essentially
act as **_proxy servers_** that sit between web applications, the browser, and the network (when available).

Practically speaking, a `ServiceWorker` is a **JavaScript file** that runs in the _background_ in a _separate thread_.
It must be registered (installed) first, and then it can talk with the application (NB: `https` is mandatory!)

Why do we need a ServiceWorker to send notification? Because it runs in the background even if our application page is
not open in the browser! And, above all, because
the [`SerciveWorkerRegistration`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) has a
method called `showNotification` which is used to displays the notification on the device.

## Send a notification

We just have to wait until the service worker is ready and call the method by passing the notification title as the
first parameter.

```javascript
navigator.serviceWorker.ready.then((swRegistration) => {
  swRegistration.showNotification("My First notification!");
})
```

These few lines of code will show the notification:

![Notification popup on a Mac](/static/images/articles/notifications-in-browsers/notifications-mac.jpeg)

## Notification properties

The [`showNotification`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
method has a second argument that accepts an object of options which allows us to customize the notification:

- `icon`: an URL representing an image that will be displayed next to the notification title
- `image`: an URL representing an image that will be displayed as a content of the notification
- `actions`: an array of actions that will result in a list of clickable buttons below the notification content
- `action`: a unique string representing the ID of the action
- `title`: a human readable string to be displayed
- `icon`: an URL representing the image next to the title
- `body`: A string representing an extra content to display within the notification.
- `badge`: a string containing the URL of an image to represent the notification when there is not enough space to
  display the notification itself such as for example, the Android Notification Bar.
- `data`: Arbitrary data that you want to be associated with the notification
- `tag`: An ID for a given notification that allows you to find, replace, or remove the notification using a script if
  necessary.
- `silent`: if `true`, no vibration or alert sound
- `vibrate`: an array of numbers representing the vibration patter
- ...and many more!

## "Come back" notification

Let's try creating together a "come back" notification that shows up when the application lose focus and hides
automatically when it is on focus again. It also takes the user directly back to the application if the notification is
clicked.

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    navigator.serviceWorker.ready.then(async registration => {
      await registration.showNotification("Come baaaaack!", {
        body: `Click here and come back to the website!`,
        silent: true,
        tag: "come-back", // required if silent is set to "true"
      });
      registration.addEventListener('click', (e) => {
        e.preventDefault();
        window.parent.focus();
      });
    });
  } else {
    navigator.serviceWorker.ready.then(registration => {
      registration.getNotifications({
        tag: 'come-back'
      }).then((notifications) => {
        notifications.forEach(n => {
          n.close();
        })
      });
    })
  }
});
```

## Notifications without ServiceWorker

"_What?! You just said that ServiewWorker are required to send notification!!_"
I know... There is an alternative method which doesn't involve `ServiceWorker` actually, but it relies on a deprecated
feature! The [`window.Notification`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification)
constructor is not marked as deprecated, however, it’s marked as deprecated in Chrome on Android, thus it won't work on
mobile devices! This is why I preferred to use the ServiceWorker method directly!

I'm going to write an example because it might be interesting for those who don't deal with mobile browsers!

## "OLD" way: Notification constructor

Let's re-create the "come back" notification using the `Notification` constructor.

```javascript
let comeBackNotification;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    comeBackNotification = new Notification("Come baaaaack!");

    comeBackNotification.addEventListener('close', (e) => {
      console.log("Notification CLOSED!", e.target.data)
    });

    comeBackNotification.addEventListener('click', (e) => {
      console.log("Notification CLICKED!", e.target.data)
      e.preventDefault();
      window.parent.focus();
    });
  } else {
    comeBackNotification.close();
  }
})
```

## Good to know

- Starting in Chrome 49, notifications don't work in incognito mode.
- `notification.vibrate` doesn't work in Android > 8.0
- `sw.js`, if we don't need it, it could be just an empty file!
- Chrome for Android requires the call to be made with a service worker registration
- iOS requires website to first be added to the Home Screen

### Wait Until

One of the things to understand about service workers is that you have little control over when the service worker code
is going to run. The browser decides when to wake it up and when to terminate it. The only way you can tell the browser
to wait, is to pass a promise into the `event.waitUntil()` method. With this, the browser will keep the service worker
running until the promise you passed in has settled.

```javascript
// file: `sw,js`
self.addEventListener('push', function(event) {
  const promiseChain = self.registration.showNotification("Push Notification");
  event.waitUntil(promiseChain);
})
```

## Push Notifications (from remote server)

The essential difference between _local notifications_ and _push notifications_ is simple:

- **Local notifications** are scheduled by an app locally and are _delivered by the same device_.

- **Push notifications** are sent by a _remote server_ which sends these notifications to devices on which the app is
  installed.

I won't talk about the server side part, thus I'm going to explain how to simulate a Push Notification using Chrome
DevTools.

### Simulate a Push Notification with Chrome DevTools:

- Open Chrome DevTools
- Go to `Application` tab
- Select `Service Workers` on the left
- Write a custom message on the right anche click `Push`

![Test Push Notification message on Chrome DevTools](/static/images/articles/notifications-in-browsers/service-worker-developer-tools.png)

## Demo

As usual, I created a [demo](https://push-notifications-playground.danielzotti.it) and
a [GitHub project](https://github.com/danielzotti/push-notifications-local)

While running the demo, check the `console` for more information.
