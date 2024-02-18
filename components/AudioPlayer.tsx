import React, { useState, useEffect } from "react";

interface AudioPlayerProps {
  tracks: { src: string; volume: number }[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElements = useState(() =>
    tracks.map(({ src, volume }) => {
      const audio = new Audio(src);
      audio.volume = volume / 100;
      return audio;
    })
  )[0];

  useEffect(() => {
    audioElements.forEach((audio) => {
      audio.addEventListener("ended", () => setIsPlaying(false));
    });

    return () => {
      audioElements.forEach((audio) => {
        audio.removeEventListener("ended", () => setIsPlaying(false));
      });
    };
  }, []);

  useEffect(() => {
    audioElements.forEach((audio, index) => {
      audio.volume = tracks[index].volume / 100;
    });
  }, [tracks]);

  const togglePlay = () => {
    if (isPlaying) {
      audioElements.forEach((audio) => audio.pause());
    } else {
      audioElements.forEach((audio) => audio.play());
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="w-[90%] h-[90%] rounded-full bg-[#c4a89c] hover:bg-[#c2a497] shadow-stem-inner-button cursor-pointer"
      onClick={togglePlay}
    ></button>
  );
};

export default AudioPlayer;
