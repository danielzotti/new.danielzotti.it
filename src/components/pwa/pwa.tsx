"use client";

import { useEffect } from "react";

const isProduction = process.env.NODE_ENV === "production";

export default function Pwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (!isProduction) {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(registrations.map((registration) => registration.unregister())),
        )
        .then((results) => {
          if (results.length > 0 && results.some((unregistered) => !unregistered)) {
            console.log("Some service workers could not be unregistered in development.");
          }
        })
        .catch((err) => {
          console.log("Service Worker cleanup failed: ", err);
        });
      return;
    }

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope,
        );
      })
      .catch((err) => {
        console.log("Service Worker registration failed: ", err);
      });
  }, []);

  return <></>;
}
