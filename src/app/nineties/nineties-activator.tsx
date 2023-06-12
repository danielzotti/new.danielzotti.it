'use client';
import { useEffect } from 'react';
import { activate90s, is90sActive } from '../../utils/nineties';

export const NinetiesActivator = () => {

  useEffect(() => {
    if (!is90sActive()) {
      activate90s();
    }
  }, []);

  return null;
};
