"use client";
import { useState, useEffect, useRef } from "react";
import LightModule from "../components/LightModule";
const AudioPlayer = dynamic(() => import("../components/AudioPlayer"), {
  ssr: false,
});
import dynamic from "next/dynamic";

export default function Home() {
  const [vocalsVolume, setVocalsVolume] = useState(100);
  const [drumsVolume, setDrumsVolume] = useState(100);
  const [bassVolume, setBassVolume] = useState(100);
  const [otherVolume, setOtherVolume] = useState(100);

  const [vocalsHovered, setVocalsHovered] = useState(false);
  const [drumsHovered, setDrumsHovered] = useState(false);
  const [bassHovered, setBassHovered] = useState(false);
  const [otherHovered, setOtherHovered] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDown, setIsTouchDown] = useState(false);

  const colors = ["#f7584d", "#f7694d", "#f74d6f", "#462eff"];

  const handleMouseEnter = (id: string) => {
    switch (id) {
      case "top":
        setVocalsHovered(true);
        //console.log("Vocals Hovered");
        break;
      case "right":
        setDrumsHovered(true);
        //console.log("Drums Hovered");
        break;
      case "left":
        setBassHovered(true);
        //console.log("Bass Hovered");
        break;
      case "bottom":
        setOtherHovered(true);
        //console.log("Other Hovered");
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (id: string) => {
    switch (id) {
      case "top":
        setVocalsHovered(false);
        setIsMouseDown(false);
        setIsTouchDown(false);
        //console.log("Vocals Unhovered");
        break;
      case "right":
        setDrumsHovered(false);
        setIsMouseDown(false);
        setIsTouchDown(false);
        //console.log("Drums Unhovered");
        break;
      case "left":
        setBassHovered(false);
        setIsMouseDown(false);
        setIsTouchDown(false);
        //console.log("Bass Unhovered");
        break;
      case "bottom":
        setOtherHovered(false);
        setIsMouseDown(false);
        setIsTouchDown(false);
        //console.log("Other Unhovered");
        break;
      default:
        break;
    }
  };

  const handleMouseDown = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.MouseEvent) => {
          if (vocalsHovered && !isMouseDown && event.type === "mousedown") {
            setIsMouseDown(true);
            //console.log("Vocals Clicked");
            return;
          }
        };
      case "right":
        return (event: React.MouseEvent) => {
          if (drumsHovered && !isMouseDown && event.type === "mousedown") {
            setIsMouseDown(true);
            //console.log("Drums Clicked");
            return;
          }
        };
      case "left":
        return (event: React.MouseEvent) => {
          if (bassHovered && !isMouseDown && event.type === "mousedown") {
            setIsMouseDown(true);
            //console.log("Bass Clicked");
            return;
          }
        };
      case "bottom":
        return (event: React.MouseEvent) => {
          if (otherHovered && !isMouseDown && event.type === "mousedown") {
            setIsMouseDown(true);
            //console.log("Other Clicked");
            return;
          }
        };
      default:
        break;
    }
  };

  const handleMouseUp = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.MouseEvent) => {
          if (vocalsHovered && event.type === "mouseup") {
            setIsMouseDown(false);
            //console.log("Vocals UnClicked");
            return;
          }
        };
      case "right":
        return (event: React.MouseEvent) => {
          if (drumsHovered && event.type === "mouseup") {
            setIsMouseDown(false);
            //console.log("Drums UnClicked");
            return;
          }
        };
      case "left":
        return (event: React.MouseEvent) => {
          if (bassHovered && event.type === "mouseup") {
            setIsMouseDown(false);
            //console.log("Bass UnClicked");
            return;
          }
        };
      case "bottom":
        return (event: React.MouseEvent) => {
          if (otherHovered && event.type === "mouseup") {
            setIsMouseDown(false);
            //console.log("Other UnClicked");
            return;
          }
        };
      default:
        break;
    }
  };

  const handleMouseDrag = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.MouseEvent) => {
          if (vocalsHovered && isMouseDown && event.type === "mousemove") {
            //console.log("Vocals Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetY = (event as React.MouseEvent).clientY - rect.top;
            const height = rect.height;
            let newVolume = ((height - offsetY) / height) * 100;
            newVolume = Math.round(newVolume);
            //console.log(newVolume);
            setVocalsVolume(newVolume);
          }
        };
      case "bottom":
        return (event: React.MouseEvent) => {
          if (otherHovered && isMouseDown && event.type === "mousemove") {
            //console.log("Other Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetY = (event as React.MouseEvent).clientY - rect.top;
            const height = rect.height;
            let newVolume = ((height - offsetY) / height) * 100;
            newVolume = Math.round(newVolume);
            newVolume = 100 - newVolume;
            //console.log(newVolume);
            setOtherVolume(newVolume);
          }
        };
      case "right":
        return (event: React.MouseEvent) => {
          if (drumsHovered && isMouseDown && event.type === "mousemove") {
            //console.log("Drums Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = (event as React.MouseEvent).clientX - rect.left;
            const width = rect.width;
            let newVolume = (offsetX / width) * 100;
            newVolume = Math.round(newVolume);
            //console.log(newVolume);
            setDrumsVolume(newVolume);
          }
        };
      case "left":
        return (event: React.MouseEvent) => {
          if (bassHovered && isMouseDown && event.type === "mousemove") {
            //console.log("Bass Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = (event as React.MouseEvent).clientX - rect.left;
            const width = rect.width;
            let newVolume = (offsetX / width) * 100;
            newVolume = Math.round(newVolume);
            newVolume = 100 - newVolume;
            //console.log(newVolume);
            setBassVolume(newVolume);
          }
        };
      default:
        break;
    }
  };

  // Mobile Touch Cases:

  const handleTouchStart = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.TouchEvent) => {
          event.preventDefault();
          if (!isTouchDown && event.type === "touchstart") {
            setVocalsHovered(true);
            setIsTouchDown(true);
            //console.log("Vocals Touched");
          }
        };
      case "right":
        return (event: React.TouchEvent) => {
          event.preventDefault();
          if (!isTouchDown && event.type === "touchstart") {
            setDrumsHovered(true);
            setIsTouchDown(true);
            //console.log("Drums Touched");
          }
        };
      case "left":
        return (event: React.TouchEvent) => {
          event.preventDefault();
          if (!isTouchDown && event.type === "touchstart") {
            setBassHovered(true);
            setIsTouchDown(true);
            //console.log("Bass Touched");
          }
        };
      case "bottom":
        return (event: React.TouchEvent) => {
          event.preventDefault();
          if (!isTouchDown && event.type === "touchstart") {
            setOtherHovered(true);
            setIsTouchDown(true);
            //console.log("Other Touched");
          }
        };
      default:
        break;
    }
  };

  const handleTouchEnd = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.TouchEvent) => {
          if (event.type === "touchend") {
            setVocalsHovered(false);
            setIsTouchDown(false);
            //console.log("Vocals Untouched");
          }
        };
      case "right":
        return (event: React.TouchEvent) => {
          if (event.type === "touchend") {
            setDrumsHovered(false);
            setIsTouchDown(false);
            //console.log("Drums Untouched");
          }
        };
      case "left":
        return (event: React.TouchEvent) => {
          if (event.type === "touchend") {
            setBassHovered(false);
            setIsTouchDown(false);
            //console.log("Bass Untouched");
          }
        };
      case "bottom":
        return (event: React.TouchEvent) => {
          if (event.type === "touchend") {
            setOtherHovered(false);
            setIsTouchDown(false);
            //console.log("Other Untouched");
          }
        };
      default:
        break;
    }
  };

  const handleTouchMove = (id: string) => {
    switch (id) {
      case "top":
        return (event: React.TouchEvent) => {
          if (vocalsHovered && isTouchDown) {
            //console.log("Vocals Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetY = event.touches[0].clientY - rect.top;
            const height = rect.height;
            let newVolume = ((height - offsetY) / height) * 100;
            newVolume = Math.round(newVolume);
            newVolume = Math.max(0, Math.min(newVolume, 100));
            setVocalsVolume(newVolume);
          }
        };
      case "bottom":
        return (event: React.TouchEvent) => {
          if (otherHovered && isTouchDown) {
            //console.log("Other Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetY = event.touches[0].clientY - rect.top;
            const height = rect.height;
            let newVolume = ((height - offsetY) / height) * 100;
            newVolume = Math.round(newVolume);
            newVolume = Math.max(0, Math.min(newVolume, 100));
            newVolume = 100 - newVolume;
            setOtherVolume(newVolume);
          }
        };
      case "right":
        return (event: React.TouchEvent) => {
          if (drumsHovered && isTouchDown) {
            //console.log("Drums Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.touches[0].clientX - rect.left;
            const width = rect.width;
            let newVolume = (offsetX / width) * 100;
            newVolume = Math.round(newVolume);
            newVolume = Math.max(0, Math.min(newVolume, 100));
            setDrumsVolume(newVolume);
          }
        };
      case "left":
        return (event: React.TouchEvent) => {
          if (bassHovered && isTouchDown) {
            //console.log("Bass Dragged");
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.touches[0].clientX - rect.left;
            const width = rect.width;
            let newVolume = (offsetX / width) * 100;
            newVolume = Math.round(newVolume);
            newVolume = Math.max(0, Math.min(newVolume, 100));
            newVolume = 100 - newVolume;
            setBassVolume(newVolume);
          }
        };
      default:
        break;
    }
  };

  return (
    <main className="flex h-svh flex-col items-center justify-between">
      <div>Stem Player</div>
      <div className="md:h-128 md:w-128 sm:h-96 sm:w-96 w-72 h-72 relative">
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div
            className="col-span-1 row-span-3 my-4 relative cursor-pointer"
            id="top"
            onMouseEnter={() => handleMouseEnter("top")}
            onMouseLeave={() => handleMouseLeave("top")}
            onMouseDown={handleMouseDown("top")}
            onMouseUp={handleMouseUp("top")}
            onMouseMove={handleMouseDrag("top")}
            onTouchStart={handleTouchStart("top")}
            onTouchEnd={handleTouchEnd("top")}
            onTouchMove={handleTouchMove("top")}
          >
            <div
              className={`w-full h-full rounded-full shadow-stem-inner-top grid grid-rows-4 items-center relative 
              `}
            >
              <LightModule colors={colors} volume={vocalsVolume} />
            </div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>

          <div
            className="col-span-3 row-span-1 mx-4 relative cursor-pointer"
            id="left"
            onMouseEnter={() => handleMouseEnter("left")}
            onMouseLeave={() => handleMouseLeave("left")}
            onMouseDown={handleMouseDown("left")}
            onMouseUp={handleMouseUp("left")}
            onMouseMove={handleMouseDrag("left")}
            onTouchStart={handleTouchStart("left")}
            onTouchEnd={handleTouchEnd("left")}
            onTouchMove={handleTouchMove("left")}
          >
            <div className="w-full h-full rounded-full shadow-stem-inner-left grid grid-cols-4 items-center">
              <LightModule colors={colors} volume={bassVolume} />
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
          <div
            className="col-span-3 row-span-1 mx-4 relative cursor-pointer"
            id="right"
            onMouseEnter={() => handleMouseEnter("right")}
            onMouseLeave={() => handleMouseLeave("right")}
            onMouseDown={handleMouseDown("right")}
            onMouseUp={handleMouseUp("right")}
            onMouseMove={handleMouseDrag("right")}
            onTouchStart={handleTouchStart("right")}
            onTouchEnd={handleTouchEnd("right")}
            onTouchMove={handleTouchMove("right")}
          >
            <div
              className="w-full h-full rounded-full shadow-stem-inner-right grid grid-cols-4 items-center"
              dir="rtl"
            >
              <LightModule colors={colors} volume={drumsVolume} />
            </div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div
            className="col-span-1 row-span-3 my-4 relative cursor-pointer"
            id="bottom"
            onMouseEnter={() => handleMouseEnter("bottom")}
            onMouseLeave={() => handleMouseLeave("bottom")}
            onMouseDown={handleMouseDown("bottom")}
            onMouseUp={handleMouseUp("bottom")}
            onMouseMove={handleMouseDrag("bottom")}
            onTouchStart={handleTouchStart("bottom")}
            onTouchEnd={handleTouchEnd("bottom")}
            onTouchMove={handleTouchMove("bottom")}
          >
            <div className="w-full h-full rounded-full shadow-stem-inner-bottom grid grid-rows-4 items-center rotate-180">
              <LightModule colors={colors} volume={otherVolume} />
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
