'use client';

import { useEffect } from 'react';
import { activate90s, deactivate90s, is90sActive } from '../../utils/nineties';

let word = '';

interface NinetiesProps {
  activateKeyword?: string;
  deactivateKeyword?: string;
}

export const Nineties = ({ activateKeyword = 'internetexplorer', deactivateKeyword = 'stop' }: NinetiesProps) => {
  useEffect(() => {
    const check = (e: KeyboardEvent) => {
      if (word?.length > 50) {
        word = '';
      }

      let typing = word;
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) || // letter uppercase
        (e.keyCode >= 97 && e.keyCode <= 122) // letter lowercase
      ) {
        if (!typing) {
          typing = '';
        }

        typing += String.fromCharCode(e.which).toLowerCase();

        word = typing;

        if (word.match(activateKeyword) && !is90sActive()) {
          activate90s();
          return;
        }

        if (word.match(deactivateKeyword) && is90sActive()) {
          deactivate90s();
        }
      } else {
        word = '';
      }
    };
    document.addEventListener('keyup', check);

    return () => {
      document.removeEventListener('keyup', check);
    };
  }, [activateKeyword, deactivateKeyword]);
  return null;
};
