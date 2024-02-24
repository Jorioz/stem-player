import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
//@ts-ignore
import { unmute } from "/unmute.js";

type AudioPlayerProps = {
  tracks: { src: string; volume: number }[];
  selectedTrack: string | null;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks, selectedTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [vocals, setVocals] = useState<Howl | null>(null);
  const [other, setOther] = useState<Howl | null>(null);
  const [bass, setBass] = useState<Howl | null>(null);
  const [drums, setDrums] = useState<Howl | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPathValid, setIsPathValid] = useState(false);
  const prevSelectedTrack = useRef(selectedTrack);

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
      setVocals(null);
      setOther(null);
      setBass(null);
      setDrums(null);
      vocals?.unload();
      other?.unload();
      bass?.unload();
      drums?.unload();
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

  // Load tracks:
  useEffect(() => {
    if (isPathValid) {
      if (!vocals) {
        // If no vocals, create new instance
        const newVocals = new Howl({
          src: [tracks[0].src],
          volume: 1,
          onload: () => {
            //console.log("Vocals loaded");
            setVocals(newVocals);
          },
        });
      } else {
        // If Vocals exist:
        //console.log("Vocals exist");
        //console.log("Vocals state:", vocals.state());
        vocals.volume(tracks[0].volume / 100);
      }

      if (!other) {
        // If no Other, create new instance
        const newOther = new Howl({
          src: [tracks[1].src],
          volume: 1,
          onload: () => {
            //console.log("Other loaded");
            setOther(newOther);
          },
        });
      } else {
        // If Other exist:
        //console.log("Vocals exist");
        //console.log("Vocals state:", other.state());
        other.volume(tracks[1].volume / 100);
      }

      if (!bass) {
        // If no Bass, create new instance
        const newBass = new Howl({
          src: [tracks[2].src],
          volume: 1,
          onload: () => {
            //console.log("Bass loaded");
            setBass(newBass);
          },
        });
      } else {
        // If Other exist:
        //console.log("Bass exist");
        //console.log("Bass state:", bass.state());
        bass.volume(tracks[2].volume / 100);
      }

      if (!drums) {
        // If no Drum, create new instance
        const newDrums = new Howl({
          src: [tracks[3].src],
          volume: 1,
          onload: () => {
            //console.log("Drums loaded");
            setDrums(newDrums);
          },
        });
      } else {
        // If Drums exist:
        //console.log("Drum exist");
        //console.log("Drum state:", drums.state());
        drums.volume(tracks[3].volume / 100);
      }
      if (vocals && other && bass && drums) {
        setIsLoaded(true);
        //console.log("READY TO PLAY");
      }
    }
  });

  // Control Playback:
  const controlPlayback = () => {
    if (isLoaded) {
      if (isPlaying) {
        vocals?.pause();
        other?.pause();
        bass?.pause();
        drums?.pause();
        //console.log("Paused");
        setIsPlaying(false);
      } else {
        vocals?.play();
        other?.play();
        bass?.play();
        drums?.play();
        //console.log("Playing");
        setIsPlaying(true);
      }
    }
  };

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
