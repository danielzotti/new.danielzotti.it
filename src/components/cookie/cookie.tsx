import { CookiePolicyContent } from './cookie-policy-content';
import { CookieManager } from './cookie-manager';

export const Cookie = () => {
  return <CookieManager policy={<CookiePolicyContent />} />;
};
