"use client";

import { config } from "src/config";
import { useEffect, useRef } from "react";
import { useConsoleCool } from "src/hooks/useConsoleCool";
import { isHalloween } from "../../utils/halloween";

const getVideoprofileUrl = () => {
  if (isHalloween()) {
    return {
      webm: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.webm`,
      mp4: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.mp4`,
      gif: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.gif`,
      jpg: `${config.imageUrls.videoprofile}/videoprofile.jpg`,
      isLoop: false,
    };
  } else {
    return {
      webm: `${config.imageUrls.videoprofile}/videoprofile-small.webm`,
      mp4: `${config.imageUrls.videoprofile}/videoprofile-small.mp4`,
      gif: `${config.imageUrls.videoprofile}/videoprofile-small.gif`,
      jpg: `${config.imageUrls.videoprofile}/videoprofile.jpg`,
      isLoop: true,
    };
  }
};

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
        video.current.poster = getVideoprofileUrl().jpg;

        consoleCool(
          "Your browser is a bad boy and it's preventing my profile \"image\" (which is actually a video) from playing. \
I'm a bad boy too, so I'm changing the poster attribute to a huge animated GIF \
so that it still shows the animation! 😈 It's not as performant as the video, but who cares... It's cool! 😎",
        );
      }
    };
    void play();
  }, [consoleCool]);

  return (
    <video
      ref={video}
      autoPlay
      loop={getVideoprofileUrl().isLoop}
      playsInline
      poster={getVideoprofileUrl().jpg}
      muted
      // controls
    >
      <source type="video/webm" src={getVideoprofileUrl().webm} />
      <source type="video/mp4" src={getVideoprofileUrl().mp4} />
    </video>
  );
};
