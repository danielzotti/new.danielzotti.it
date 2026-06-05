"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "src/config";
import { useConsoleCool } from "src/hooks/useConsoleCool";
import { isHalloween } from "../../utils/halloween";
import {
  getGhostbustersStorageDay,
  GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY,
  GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT,
  GHOSTBUSTERS_MANUAL_ACTIVATION_KEY,
} from "../../utils/ghostbusters";
import { isXmasTime } from "../../utils/xmas";

const GHOSTBUSTERS_TAP_TARGET = 8;

export const Videoprofile = () => {
  const { consoleCool } = useConsoleCool();
  const video = useRef<HTMLVideoElement>(null);
  const tapCountRef = useRef<number>(0);
  const [canShowVideoSource, setCanShowVideoSource] = useState<boolean>(false);

  const profileUrl = useMemo(() => {
    if (isHalloween()) {
      return {
        webm: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.webm`,
        mp4: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.mp4`,
        gif: `${config.imageUrls.videoprofile}/videoprofile-halloween-transition.gif`,
        jpg: `${config.imageUrls.videoprofile}/videoprofile.jpg`,
        isLoop: false,
      };
    } else if (isXmasTime()) {
      return {
        webm: `${config.imageUrls.videoprofile}/videoprofile-xmas-transition.webm`,
        mp4: `${config.imageUrls.videoprofile}/videoprofile-xmas-transition.mp4`,
        gif: `${config.imageUrls.videoprofile}/videoprofile-xmas-transition.gif`,
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
  }, []);

  useEffect(() => {
    // NOTE: this useEffect + useState is necessary to change URLs on the client side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanShowVideoSource(true);
  }, [setCanShowVideoSource]);

  const onVideoprofileTap = () => {
    tapCountRef.current += 1;

    if (tapCountRef.current < GHOSTBUSTERS_TAP_TARGET) {
      return;
    }

    tapCountRef.current = 0;

    localStorage.setItem(GHOSTBUSTERS_MANUAL_ACTIVATION_KEY, "true");
    localStorage.setItem(
      GHOSTBUSTERS_MANUAL_ACTIVATION_DATE_KEY,
      getGhostbustersStorageDay(),
    );

    globalThis.dispatchEvent(new Event(GHOSTBUSTERS_MANUAL_ACTIVATION_EVENT));
  };

  useEffect(() => {
    const play = async () => {
      if (!video.current) {
        return;
      }
      try {
        await video.current.play();
      } catch (e) {
        console.error(e);
        video.current.poster = profileUrl.gif;

        consoleCool(
          "Your browser is a bad boy and it's preventing my profile \"image\" (which is actually a video) from playing. \
I'm a bad boy too, so I'm changing the poster attribute to a huge animated GIF \
so that it still shows the animation! 😈 It's not as performant as the video, but who cares... It's cool! 😎",
        );
      }
    };

    if (canShowVideoSource) {
      void play();
    }
  }, [consoleCool, profileUrl, canShowVideoSource]);

  return (
    <video
      ref={video}
      autoPlay
      loop={profileUrl.isLoop}
      playsInline
      poster={profileUrl.jpg}
      muted
      // controls
      className="videoprofile"
      onPointerDown={onVideoprofileTap}
    >
      {canShowVideoSource && (
        <>
          <source type="video/webm" src={profileUrl.webm} />
          <source type="video/mp4" src={profileUrl.mp4} />
        </>
      )}
    </video>
  );
};
