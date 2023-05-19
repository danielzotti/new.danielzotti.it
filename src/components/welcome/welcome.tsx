'use client';

import { useEffect } from 'react';
import { useConsoleCool } from '../../hooks/useConsoleCool';
import { useDanielzottiInfo } from '../../hooks/useDanielzottiInfo';

export const Welcome = () => {
  const { consoleCool } = useConsoleCool();
  const danielzottiInfo = useDanielzottiInfo();

  useEffect(() => {
    consoleCool('Welcome to my website! 🥳‍ If you see this message you should be a dev! 😈');
    consoleCool(`Do you want more info? I created an object in window called "danielzotti" 🙃
Type danielzotti.help() in the console to find out what can you do`, { 'font-size': '12px'});
    window['danielzotti'] = danielzottiInfo;
  }, [consoleCool, danielzottiInfo]);

  return (
    <></>
  );
};
