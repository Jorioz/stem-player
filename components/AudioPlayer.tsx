import React, { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  tracks: { src: string; volume: number }[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);

  useEffect(() => {
    return () => {
      audioElements.forEach((audio) => {
        audio.pause();
        audio.load();
      });
    };
  }, []);

  useEffect(() => {
    updateVolume();
  }, [tracks]);

  const updateVolume = () => {
    audioElements.forEach((audio, index) => {
      audio.volume = tracks[index].volume / 100;
    });
  };

  const loadedRef = useRef(0);
  const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    console.log("Audio button clicked.");
    if (!audioElements.length) {
      const newAudioElements = tracks.map((track) => {
        const audio = new Audio(track.src);
        audio.volume = track.volume / 100;
        audio.load();
        return audio;
      });

      const loadPromises = newAudioElements.map((audio, index) => {
        return new Promise((resolve) => {
          audio.oncanplay = () => {
            loadedRef.current += 1;
            console.log(`Audio File ${tracks[index].src} loaded.`);
            resolve(null);
          };
        });
      });

      Promise.all(loadPromises).then(() => {
        if (loadedRef.current !== tracks.length) {
          console.log(
            `Something went wrong. Only ${loadedRef.current} out of ${tracks.length} loaded.`
          );
        } else {
          console.log(`All audio files loaded.`);
          setAudioElements(newAudioElements);
          // Play the tracks after they are all loaded
          newAudioElements.forEach((audio) => {
            console.log("Playing audio.");
            audio.play();
          });
          setIsPlaying(true);
        }
      });
    } else {
      if (!isPlaying) {
        audioElements.forEach((audio) => {
          audio.play();
          console.log("Playing audio.");
        });
      } else {
        audioElements.forEach((audio) => {
          audio.pause();
          console.log("Pausing audio.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      className="w-[90%] h-[90%] rounded-full bg-[#c4a89c] hover:bg-[#c2a497] shadow-stem-inner-button cursor-pointer"
      onClick={handleClick}
      onTouchEnd={handleClick}
    ></button>
  );
};

export default AudioPlayer;
