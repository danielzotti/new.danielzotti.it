'use client';

import { config } from 'src/config';
import { useEffect, useRef } from 'react';
import { useConsoleCool } from 'src/hooks/useConsoleCool';

export const Videoprofile = () => {

  const { consoleCool } = useConsoleCool();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const play = async () => {
      if (!video.current) {
        return;
      }
      try {
        await video.current.play();
      } catch (e) {
        console.error(e);
        video.current.poster = `${config.imageUrls.videoprofile}/videoprofile.gif`;

        consoleCool('Your browser is a bad boy and it\'s preventing my profile "image" (which is actually a video) from playing. \
I\'m a bad boy too, so I\'m changing the poster attribute to a huge animated GIF \
so that it still shows the animation! 😈 It\'s not as performant as the video, but who cares... It\'s cool! 😎');
      }
    };
    void play();
  }, [consoleCool]);

  return <video
    ref={video}
    autoPlay
    loop
    playsInline
    poster={`${config.imageUrls.videoprofile}/videoprofile.jpg`}
    muted
    // controls
  >
    <source type='video/webm' src={`${config.imageUrls.videoprofile}/videoprofile-small.webm`} />
    <source type='video/mp4' src={`${config.imageUrls.videoprofile}/videoprofile-small.mp4`} />
  </video>;
};
