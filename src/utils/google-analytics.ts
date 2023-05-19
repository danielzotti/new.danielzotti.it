import { config } from '../config';

export const pageview = (url: string) => {
  if (!window?.gtag) {
    return;
  }
  window.gtag('config', config.googleAnalyticsToken, {
    page_path: url
  });
};

export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams
) => {
  if (!window?.gtag) {
    return;
  }
  window.gtag('event', action, {
    event_category,
    event_label,
    value
  });
};
