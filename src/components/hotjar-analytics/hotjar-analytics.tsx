"use client";

import { useEffect } from "react";
import Hotjar from "@hotjar/browser";
import { config } from "../../config";
import { getCookie } from "../../utils/cookie";

const initHotjar = () => {
  const siteId = config.hotjarAnalyticsToken;
  const hotjarVersion = 6;

  try {
    Hotjar.init(siteId, hotjarVersion);
  } catch (error) {
    console.error("Failed to initialize Hotjar:", error);
  }

  // Remove event listeners after Hotjar is initialized
  window.removeEventListener("click", initHotjar);
  window.removeEventListener("scroll", initHotjar);
};

export default function HotjarAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Hotjar can be initiated only in production mode");
      return;
    }

    if (getCookie(config.cookieAccept) === "true") {
      window.addEventListener("click", initHotjar);
      window.addEventListener("scroll", initHotjar);

      return () => {
        window.removeEventListener("click", initHotjar);
        window.removeEventListener("scroll", initHotjar);
      };
    }
  }, []);

  return null;
}
