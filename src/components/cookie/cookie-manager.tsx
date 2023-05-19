'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './cookie-manager.module.scss';
import { getCookie, setCookie } from '../../utils/cookie';
import { config } from '../../config';
import { Button } from '../../shared/components/ui/button/button';

interface CookieManagerProps {
  policy: ReactNode;
}

export const CookieManager = ({ policy }: CookieManagerProps) => {
  const [hasRepliedToCookie, setHasRepliedToCookie] = useState<boolean | undefined>();
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState<boolean>(false);

  useEffect(() => {
    setHasRepliedToCookie(!!getCookie(config.cookieAccept));
  }, []);

  const handleLearnMore = useCallback(() => {
    setIsCookiePolicyOpen(true);
    document!.querySelector('html')!.style.overflow = 'hidden';
  }, []);


  const handleCloseLearnMore = useCallback(() => {
    setIsCookiePolicyOpen(false);
    document!.querySelector('html')!.style.overflow = 'unset';
  }, []);

  const handleReply = useCallback((hasAccepted: 'true' | 'false') => {
    setCookie(config.cookieAccept, hasAccepted);
    setCookie(config.cookieDate, new Date().toString());
    window.location.href = '';
  }, []);

  const handleReject = useCallback(() => {
    handleReply('false');
  }, [handleReply]);

  const handleAccept = useCallback(() => {
    handleReply('true');
  }, [handleReply]);

  if (hasRepliedToCookie || hasRepliedToCookie === undefined) {
    return <></>;
  }

  return <div className={styles.pageContainer}>
    {isCookiePolicyOpen && <div className={styles.cookiePolicyContainer}>
      <div className={styles.cookiePolicyContentContainer}>
        <div className={styles.closeButton}>
          <Button variant='secondary' onClick={handleCloseLearnMore}>close</Button>
        </div>
        <div className={styles.cookiePolicyContent}>
          {policy}
        </div>
        <div className={styles.buttonContainer}>
          <Button variant='secondary' onClick={handleReject}>Reject</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>}
    <div className={styles.bannerContainer}>
      <div className='container'>
        <p>
          I personally love cookies 🍪 but not everyone has a sweet tooth like me!
          With the buttons below you can either accept the <span className={styles.policyLink}
            onClick={handleLearnMore}>cookie policy</span> or not.
          I encourage you to accept it, since I just use Google Analytics cookie to better understand the user&apos;s
          behavior on my website. Thanks! 🥹
        </p>
        <div className={styles.buttonContainer}>
          <Button variant='outline' onClick={handleReject}>Reject</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>
  </div>;
};
