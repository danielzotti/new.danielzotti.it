import { CookiePolicyContent } from 'src/components/cookie/cookie-policy-content';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';
import { config } from 'src/config';

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle('Cookie Policy'),
  description: 'Cookie Policy of danielzotti.it website',
  url: `${config.baseUrl}${config.urls.cookiePolicy}`
});

export default function CookiePolicyPage() {
  return (
    <div>
      <CookiePolicyContent />
    </div>
  );
};
