import React, { useState, useEffect } from "react";
import { Howl } from "howler";
//@ts-ignore
import { unmute } from "/unmute.js";

interface AudioPlayerProps {
  tracks: { src: string; volume: number }[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [vocals, setVocals] = useState<Howl | null>(null);
  const [other, setOther] = useState<Howl | null>(null);
  const [bass, setBass] = useState<Howl | null>(null);
  const [drums, setDrums] = useState<Howl | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Unmute WebAudio on iOS. From: https://github.com/swevans/unmute
  useEffect(() => {
    // Create an audio context instance if WebAudio is supported
    let context =
      window.AudioContext || (window as any).webkitAudioContext
        ? new (window.AudioContext || (window as any).webkitAudioContext)()
        : null;

    // Decide on some parameters
    let allowBackgroundPlayback = false; // default false, recommended false
    let forceIOSBehavior = false; // default false, recommended false

    // Pass it to unmute if the context exists... ie WebAudio is supported
    let unmuteHandle: { dispose: () => void } | undefined;
    if (context) {
      // If you need to be able to disable unmute at a later time, you can use the returned handle's dispose() method
      // if you don't need to do that (most folks won't) then you can simply ignore the return value
      unmuteHandle = unmute(context, allowBackgroundPlayback, forceIOSBehavior);
    }

    // Return a cleanup function to stop unmute control when the component unmounts
    return () => {
      if (unmuteHandle) {
        unmuteHandle.dispose();
        unmuteHandle = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!vocals) {
      const newVocals = new Howl({
        src: [tracks[0].src],
        volume: 1,
      });
      setVocals(newVocals);
      console.log("Vocals Loaded");
    } else {
      vocals.volume(tracks[0].volume / 100);
    }

    if (!other) {
      const newOther = new Howl({
        src: [tracks[1].src],
        volume: 1,
      });
      setOther(newOther);
      console.log("Other Loaded");
    } else {
      other.volume(tracks[1].volume / 100);
    }

    if (!bass) {
      const newBass = new Howl({
        src: [tracks[2].src],
        volume: 1,
      });
      setBass(newBass);
      console.log("Bass Loaded");
    } else {
      bass.volume(tracks[2].volume / 100);
    }

    if (!drums) {
      const newDrums = new Howl({
        src: [tracks[3].src],
        volume: tracks[3].volume / 100,
      });
      setDrums(newDrums);
      console.log("Drums Loaded");
    } else {
      drums.volume(tracks[3].volume / 100);
    }
  }, [tracks]);

  useEffect(() => {
    const checkLoaded = () => {
      if (
        vocals?.state() === "loaded" &&
        other?.state() === "loaded" &&
        bass?.state() === "loaded" &&
        drums?.state() === "loaded"
      ) {
        setIsLoaded(true);
        console.log("All tracks loaded");
        clearInterval(intervalId);
      } else {
        console.log("Not all tracks loaded");
      }
    };

    checkLoaded();
    const intervalId = setInterval(checkLoaded, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [vocals, other, bass, drums]);

  const controlPlayback = () => {
    if (isLoaded) {
      if (isPlaying) {
        vocals?.pause();
        other?.pause();
        bass?.pause();
        drums?.pause();
        console.log("Paused");
      } else {
        vocals?.play();
        other?.play();
        bass?.play();
        drums?.play();
        console.log("Playing");
      }

      setIsPlaying(!isPlaying);
    }
  };

  vocals?.on("end", () => {
    setIsPlaying(false);
  });

  return (
    <button
      className={`w-[90%] h-[90%] rounded-full ${
        isLoaded ? "bg-[#c4a89c] hover:bg-[#bea296]" : "bg-red-500"
      } shadow-stem-inner-button cursor-pointer`}
      onClick={controlPlayback}
    ></button>
  );
};

export default AudioPlayer;
