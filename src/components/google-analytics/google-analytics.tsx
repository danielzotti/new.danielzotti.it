'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { pageview } from 'src/utils/google-analytics';
import { config } from 'src/config';
import { getCookie } from 'src/utils/cookie';

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasAcceptedCookie, setHasAcceptedCookie] = useState<boolean>(false);

  useEffect(() => {
    if (pathname) {
      if (process.env.NODE_ENV !== 'production') {
        // console.log(`Page "${pathname}" not saved to Google Analytics since it's a dev env`);
        return;
      }
      pageview(pathname);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (getCookie(config.cookieAccept) === 'true') {
      setHasAcceptedCookie(true);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  if (!hasAcceptedCookie) {
    return null;
  }

  return (
    <>
      <Script async
        src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsToken}`}
        strategy='afterInteractive'
      ></Script>
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', '${config.googleAnalyticsToken}');
          `}
      </Script>
    </>
  );
};
