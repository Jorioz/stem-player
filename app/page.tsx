"use client";
import { useState, useEffect, useRef } from "react";
import LightModule from "../components/LightModule";
import AudioPlayer from "../components/AudioPlayer";

export default function Home() {
  const [vocalsVolume, setVocalsVolume] = useState(100);
  const [drumsVolume, setDrumsVolume] = useState(100);
  const [bassVolume, setBassVolume] = useState(100);
  const [otherVolume, setOtherVolume] = useState(100);

  const [sliderValue, setSliderValue] = useState(100);
  const colors = ["#f7584d", "#f7694d", "#f74d6f", "#462eff"];

  const handleVocalsVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseInt(event.target.value);
    if (newVolume === 0) {
      setVocalsVolume(newVolume);
      if (audioElements && audioElements[0]) {
        audioElements[0].pause();
        audioElements[0].volume = 1;
      }
    } else {
      setVocalsVolume(newVolume);
      if (audioElements && audioElements[0]) {
        audioElements[0].volume = newVolume / 100;
      }
    }
  };

  const handleDrumsVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseInt(event.target.value);
    if (newVolume === 0) {
      setDrumsVolume(newVolume);
      if (audioElements && audioElements[1]) {
        audioElements[1].pause();
        audioElements[1].volume = 1;
      }
    } else {
      setDrumsVolume(newVolume);
      if (audioElements && audioElements[1]) {
        audioElements[1].volume = newVolume / 100;
      }
    }
  };

  const handleBassVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseInt(event.target.value);
    if (newVolume === 0) {
      setBassVolume(newVolume);
      if (audioElements && audioElements[2]) {
        audioElements[2].pause();
        audioElements[2].volume = 1;
      }
    } else {
      setBassVolume(newVolume);
      if (audioElements && audioElements[2]) {
        audioElements[2].volume = newVolume / 100;
      }
    }
  };

  const handleOtherVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseInt(event.target.value);
    if (newVolume === 0) {
      setOtherVolume(newVolume);
      if (audioElements && audioElements[3]) {
        audioElements[3].pause();
        audioElements[3].volume = 1;
      }
    } else {
      setOtherVolume(newVolume);
      if (audioElements && audioElements[3]) {
        audioElements[3].volume = newVolume / 100;
      }
    }
  };

  // Ensure audioElements is accessible
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);

  return (
    <main className="flex h-svh flex-col items-center justify-between">
      <div>Stem Player</div>
      <div className="md:h-128 md:w-128 sm:h-96 sm:w-96 w-72 h-72 relative">
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div className="col-span-1 row-span-3 my-4 relative" id="top">
            <input
              id="vocal-slider"
              type="range"
              className="-rotate-90 absolute h-1/2 w-24 sm:w-32 md:w-48 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 opacity-0 cursor-pointer"
              min="0"
              max="100"
              step="1"
              value={vocalsVolume}
              onChange={handleVocalsVolumeChange}
            />
            <div className="w-full h-full rounded-full shadow-stem-inner-top grid grid-rows-4 items-center relative">
              <LightModule
                colors={colors}
                instrument="Vocals"
                volume={vocalsVolume}
              />
            </div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>

          <div className="col-span-3 row-span-1 mx-4 relative" id="left">
            <input
              id="bass-slider"
              type="range"
              className="rotate-180 absolute h-1/2 w-24 sm:w-32 md:w-48 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 opacity-0 cursor-pointer"
              min="0"
              max="100"
              step="1"
              value={bassVolume}
              onChange={handleBassVolumeChange}
            />
            <div className="w-full h-full rounded-full shadow-stem-inner-left grid grid-cols-4 items-center">
              <LightModule
                colors={colors}
                instrument="Bass"
                volume={bassVolume}
              />
            </div>
          </div>
          <div className="col-span-1 row-span-1" id="middle">
            <div className="w-full h-full rounded-full shadow-stem-inner-mid flex justify-center items-center">
              <AudioPlayer
                tracks={[
                  { src: "/vocals.wav", volume: vocalsVolume },
                  { src: "/other.wav", volume: otherVolume },
                  { src: "/bass.wav", volume: bassVolume },
                  { src: "/drums.wav", volume: drumsVolume },
                ]}
              />
            </div>
          </div>
          <div className="col-span-3 row-span-1 mx-4 relative" id="right">
            <input
              id="drums-slider"
              type="range"
              className="absolute h-1/2 w-24 sm:w-32 md:w-48 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 opacity-0 cursor-pointer"
              min="0"
              max="100"
              step="1"
              value={drumsVolume}
              onChange={handleDrumsVolumeChange}
            />
            <div
              className="w-full h-full rounded-full shadow-stem-inner-right grid grid-cols-4 items-center"
              dir="rtl"
            >
              <LightModule
                colors={colors}
                instrument="Drums"
                volume={drumsVolume}
              />
            </div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div className="col-span-1 row-span-3 my-4 relative" id="bottom">
            <input
              id="other-slider"
              type="range"
              className="rotate-90 absolute h-1/2 w-24 sm:w-32 md:w-48 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 opacity-0 cursor-pointer"
              min="0"
              max="100"
              step="1"
              value={otherVolume}
              onChange={handleOtherVolumeChange}
            />
            <div className="w-full h-full rounded-full shadow-stem-inner-bottom grid grid-rows-4 items-center rotate-180">
              <LightModule
                colors={colors}
                instrument="Other"
                volume={otherVolume}
              />
            </div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>
        </div>
        <div className="w-full h-full bg-[#c4a89c] rounded-full shadow-stem-shadow"></div>
      </div>
      <div>
        Another Project by{" "}
        <a
          href="https://github.com/Jorioz"
          className="font-bold"
          target="_blank"
        >
          Jorio
        </a>
      </div>
    </main>
  );
}
