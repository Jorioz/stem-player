import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
//@ts-ignore
import { unmute } from "/unmute.js";

type AudioPlayerProps = {
  tracks: { src: string; volume: number }[];
  selectedTrack: string | null;
  setIsLoaderVisible: (isVisible: boolean) => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  tracks,
  selectedTrack,
  setIsLoaderVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const vocalsRef = useRef<Howl | null>(null);
  const otherRef = useRef<Howl | null>(null);
  const bassRef = useRef<Howl | null>(null);
  const drumsRef = useRef<Howl | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPathValid, setIsPathValid] = useState(false);
  const prevSelectedTrack = useRef<string | null>(null);

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

  // Reset if selected track is changed
  useEffect(() => {
    if (selectedTrack !== prevSelectedTrack.current) {
      setIsLoaded(false);
      setIsPlaying(false);
      setIsPathValid(false);
      vocalsRef.current?.unload();
      vocalsRef.current = null;
      otherRef.current?.unload();
      otherRef.current = null;
      bassRef.current?.unload();
      bassRef.current = null;
      drumsRef.current?.unload();
      drumsRef.current = null;
      //console.log("Reset");
      prevSelectedTrack.current = selectedTrack;
      //console.log("AudioPlayer using id:", selectedTrack);
    }
  }, [selectedTrack]);

  // Check if tracks exist:
  useEffect(() => {
    if (tracks !== null) {
      tracks.forEach((track) => {
        if (track.src !== null && selectedTrack !== null) {
          fetch(track.src)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              //console.log("Track exists:", track.src);
              setIsPathValid(true);
            })
            .catch((error) => {
              console.error(
                "Track does not exist:",
                track.src,
                "Error:",
                error
              );
            });
        }
      });
    }
  }, [selectedTrack]);

  // Load tracks and create instances
  useEffect(() => {
    if (isPathValid) {
      if (!vocalsRef.current) {
        // If no vocals, create new instance
        //console.log("No Vocal Instance, Creating...");
        const newVocals = new Howl({
          src: [tracks[0].src],
          volume: tracks[0].volume / 100,
          onload: () => {
            //console.log("Vocals loaded");
            vocalsRef.current = newVocals;
            checkAllTracksLoaded();
          },
        });
      }

      if (!otherRef.current) {
        // If no Other, create new instance
        //console.log("No Other Instance, Creating...");
        const newOther = new Howl({
          src: [tracks[1].src],
          volume: tracks[1].volume / 100,
          onload: () => {
            //console.log("Other loaded");
            otherRef.current = newOther;
            checkAllTracksLoaded();
          },
        });
      }

      if (!bassRef.current) {
        // If no Bass, create new instance
        //console.log("No Bass Instance, Creating...");
        const newBass = new Howl({
          src: [tracks[2].src],
          volume: tracks[2].volume / 100,
          onload: () => {
            //console.log("Bass loaded");
            bassRef.current = newBass;
            checkAllTracksLoaded();
          },
        });
      }

      if (!drumsRef.current) {
        // If no Drum, create new instance
        //console.log("No Drum Instance, Creating...");
        const newDrums = new Howl({
          src: [tracks[3].src],
          volume: tracks[3].volume / 100,
          onload: () => {
            //console.log("Drums loaded");
            drumsRef.current = newDrums;
            //console.log("Checking for load");
            checkAllTracksLoaded();
          },
        });
      }
    }
  }, [isPathValid]);

  const checkAllTracksLoaded = () => {
    if (
      vocalsRef.current?.state() === "loaded" &&
      otherRef.current?.state() === "loaded" &&
      bassRef.current?.state() === "loaded" &&
      drumsRef.current?.state() === "loaded"
    ) {
      //console.log("All tracks loaded");
      setIsLoaded(true);
    }
  };

  // Control Playback:
  const controlPlayback = () => {
    if (isLoaded) {
      if (isPlaying) {
        vocalsRef.current?.pause();
        otherRef.current?.pause();
        bassRef.current?.pause();
        drumsRef.current?.pause();
        //console.log("Paused");
        setIsPlaying(false);
      } else {
        vocalsRef.current?.play();
        otherRef.current?.play();
        bassRef.current?.play();
        drumsRef.current?.play();
        //console.log("Playing");
        setIsPlaying(true);
      }
    }
  };

  // Update track volume:
  useEffect(() => {
    if (isLoaded) {
      if (vocalsRef.current) {
        vocalsRef.current.volume(tracks[0].volume / 100);
      }
      if (otherRef.current) {
        otherRef.current.volume(tracks[1].volume / 100);
      }
      if (bassRef.current) {
        bassRef.current.volume(tracks[2].volume / 100);
      }
      if (drumsRef.current) {
        drumsRef.current.volume(tracks[3].volume / 100);
      }
    }
  }, [tracks]);

  // Show loader when tracks arent loaded
  useEffect(() => {
    if (selectedTrack !== null) {
      if (!isLoaded) {
        setIsLoaderVisible(true);
      } else {
        setIsLoaderVisible(false);
      }
    }
  }, [isLoaded, setIsLoaderVisible, selectedTrack]);

  vocalsRef.current?.on("end", () => {
    setIsPlaying(false);
  });

  return (
    <button
      className={`w-[90%] h-[90%] rounded-full bg-[#c4a89c] hover:bg-[#bea296] shadow-stem-inner-button cursor-pointer`}
      onClick={controlPlayback}
    ></button>
  );
};

export default AudioPlayer;
