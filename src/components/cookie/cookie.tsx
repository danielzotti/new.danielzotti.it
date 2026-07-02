"use client";

import { CookiePolicyContent } from "./cookie-policy-content";
import { CookieManager } from "./cookie-manager";

export const Cookie = ({ policyContent }: { policyContent: string }) => {
  return <CookieManager policy={<CookiePolicyContent content={policyContent} />} />;
};
