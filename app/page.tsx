"use client";
import { useState } from "react";
import LightModule from "../components/LightModule";
import Tracks from "../components/Tracks";
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

  const [isInstructionVisible, setIsInstructionVisible] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [randomPalette, setRandomPalette] = useState<string[]>([
    "#bd4d4d",
    "#bd4d4d",
    "#bd4d4d",
    "#bd4d4d",
  ]);

  const colors = [
    ["#FF9843", "#FFDD95", "#86A7FC", "#3468C0"],
    ["#FFE5E5", "#E0AED0", "AC87C5", "#756AB6"],
    ["#F3F3F3", "#A3B763", "#AF2655", "#860A35"],
    ["#D0E7D2", "#B0D9B1", "#79AC78", "#618264"],
  ];

  const tracksData = [
    { src: `${selectedTrack}/vocals.wav`, volume: vocalsVolume },
    { src: `${selectedTrack}/other.wav`, volume: otherVolume },
    { src: `${selectedTrack}/bass.wav`, volume: bassVolume },
    { src: `${selectedTrack}/drums.wav`, volume: drumsVolume },
  ];

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setRandomPalette(colors[randomIndex]);
  };

  const handleTrackSelect = (id: string) => {
    switch (id) {
      case "01":
        if (selectedTrack === "jid") {
        } else {
          randomColor();
          setSelectedTrack("jid");
          console.log("Library: Selected JID");
        }
        break;
      case "02":
        if (selectedTrack === "coldplay") {
        } else {
          randomColor();
          setSelectedTrack("coldplay");
          console.log("Library: Selected Coldplay");
        }
        break;
      case "03":
        if (selectedTrack === "silksonic") {
        } else {
          randomColor();
          setSelectedTrack("silksonic");
          console.log("Library: Selected Silk Sonic");
        }
        break;
      case "04":
        if (selectedTrack === "kda") {
        } else {
          randomColor();
          setSelectedTrack("kda");
          console.log("Library: Selected K/DA");
        }
        break;
      case "05":
        if (selectedTrack === "throttle") {
        } else {
          randomColor();
          setSelectedTrack("throttle");
          console.log("Library: Selected Throttle");
        }
        break;
    }
  };

  const toggleLoading = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsLoaderVisible(isLoaderVisible);
  };

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
          if (
            (otherHovered && isMouseDown && event.type === "mousemove") ||
            isMouseDown
          ) {
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
    <>
      <header
        className={`absolute flex w-full h-svh flex-col items-center py-5 pb-10 ${
          isMenuVisible ? "z-50" : "z-0"
        }`}
      >
        <button
          className={`w-14 fill-slate-700 hover:fill-slate-400 transform trasition-all duration-200 ${
            isMenuVisible ? "rotate-45 fill-slate-100" : ""
          }`}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.32 74.32">
            <path
              className=" w-full h-full"
              d="M40.46,3.3a3,3,0,1,1-3-3A3,3,0,0,1,40.46,3.3Zm-3,5.18a3,3,0,1,0,3,2.95A3,3,0,0,0,37.5,8.48Zm0,8.13a3,3,0,1,0,3,3A3,3,0,0,0,37.5,16.61Zm0,8.14a3,3,0,1,0,3,2.95A3,3,0,0,0,37.5,24.75ZM74.66,37.5a3,3,0,1,0-3,3A3,3,0,0,0,74.66,37.5Zm-8.14,0a3,3,0,1,0-2.95,3A3,3,0,0,0,66.52,37.5Zm-8.13,0a3,3,0,1,0-3,3A3,3,0,0,0,58.39,37.5Zm-8.14,0a3,3,0,1,0-3,3A3,3,0,0,0,50.25,37.5ZM37.5,74.66a3,3,0,1,0-3-3A3,3,0,0,0,37.5,74.66Zm0-8.14a3,3,0,1,0-3-2.95A3,3,0,0,0,37.5,66.52Zm0-8.13a3,3,0,1,0-3-3A3,3,0,0,0,37.5,58.39Zm0-8.14a3,3,0,1,0-3-3A3,3,0,0,0,37.5,50.25ZM.34,37.5a3,3,0,1,0,3-3A3,3,0,0,0,.34,37.5Zm8.14,0a3,3,0,1,0,2.95-3A3,3,0,0,0,8.48,37.5Zm8.13,0a3,3,0,1,0,3-3A3,3,0,0,0,16.61,37.5Zm8.14,0a3,3,0,1,0,2.95-3A3,3,0,0,0,24.75,37.5Z"
              transform="translate(-0.34 -0.34)"
            />
          </svg>
        </button>
        <div
          className={`w-full h-full max-w-lg flex flex-col py-5 transition-all duration-200 px-5 md:px-0 ${
            isMenuVisible ? "opacity-100 " : "opacity-0"
          }`}
        >
          <div className="bg-white text-center rounded-full hover:bg-stone-300 transition-all duration-50">
            <button
              className="font-mono font-bold p-5 w-full rounded-full text-gray-800"
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
                setIsInstructionVisible(!isInstructionVisible);
              }}
            >
              Show Instructions
            </button>
          </div>
          <div className="w-full bg-white max-h-full lg:h-2/3 rounded-3xl my-5 flex flex-col overflow-hidden">
            <div className="flex flex-col justify-center items-center px-5 pt-5">
              <h1 className="font-mono text-sm md:text-base">
                Use custom song <a className="font-bold">(max 5min)</a>:
              </h1>
              <input
                className="bg-stone-300 rounded-full m-5 w-full p-5 text-gray-800 font-mono font-bold cursor-not-allowed"
                type="text"
                placeholder="Working on it..."
                disabled
              ></input>
            </div>
            <div className="flex flex-col overflow-y-auto">
              <div className="w-full flex justify-center items-center text-center">
                <hr className="w-1/5 bg-stone-300 mr-5" />
                <h1 className="font-mono text-sm md:text-base text-nowrap w-2/4">
                  Or Select A Track:
                </h1>
                <hr className="w-1/5 bg-stone-300 ml-5" />
              </div>
              <div
                className="w-full flex flex-col overflow-x-hidden"
                id="scrollbar1"
              >
                <Tracks
                  title="Lauder Too"
                  artist="JID"
                  tags="Hip-Hop"
                  tagColor="bg-blue-400"
                  extra="Bass Heavy"
                  extraColor="bg-red-400"
                  id="01"
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/cf/73/dc/cf73dc77-d33e-0b52-9a70-75f91c1eae09/22UMGIM84207.rgb.jpg/600x600bb.jpg"
                  setIsTrackSelected={handleTrackSelect}
                  toggleLoading={toggleLoading}
                />
                <Tracks
                  title="Clocks"
                  artist="Coldplay"
                  tags="Alternative"
                  tagColor="bg-green-400"
                  extra="Piano Heavy"
                  extraColor="bg-red-400"
                  id="02"
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b9/b4/2a/b9b42ad1-1e25-5096-da43-497a247e69a3/190295978051.jpg/600x600bb.jpg"
                  setIsTrackSelected={handleTrackSelect}
                  toggleLoading={toggleLoading}
                />
                <Tracks
                  title="777"
                  artist="Silk Sonic"
                  tags="R&B"
                  tagColor="bg-yellow-400"
                  extra="Drum Heavy"
                  extraColor="bg-red-400"
                  id="03"
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/4e/b2/25/4eb22575-99e3-8c06-7446-51a99add8b0f/075679754585.jpg/600x600bb.jpg"
                  setIsTrackSelected={handleTrackSelect}
                  toggleLoading={toggleLoading}
                />

                <Tracks
                  title="THE BADDEST"
                  artist="K/DA"
                  tags="K-Pop"
                  tagColor="bg-pink-400"
                  extra="Just For Fun"
                  extraColor="bg-red-200"
                  id="04"
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/7d/3c/de/7d3cdeec-948c-30a8-fade-b0d000ced138/811395035689.png/600x600bb.jpg"
                  setIsTrackSelected={handleTrackSelect}
                  toggleLoading={toggleLoading}
                />

                <Tracks
                  title="For Me"
                  artist="Throttle"
                  tags="Electronic"
                  tagColor="bg-purple-400"
                  extra="Just For Fun"
                  extraColor="bg-red-200"
                  id="05"
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/0e/ef/18/0eef1893-24fa-2878-558b-457e03d4b770/703980546697.png/600x600bb.jpg"
                  setIsTrackSelected={handleTrackSelect}
                  toggleLoading={toggleLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`absolute w-full h-svh opacity-100 flex items-center justify-center z-10 transition-opacity duration-200 ${
          isInstructionVisible ? "opacity-100" : "opacity-0"
        }`}
        onTransitionEnd={() => {
          if (!isInstructionVisible) {
            document.getElementById("instructionDiv")?.classList.add("hidden");
          }
        }}
        id="instructionDiv"
      >
        <img
          src="instructions.svg"
          className={`aspect-square md:h-160 md:w-160 sm:h-[30rem] sm:w-[30rem] w-[22rem] h-[22rem] transition-opacity duration-500 ${
            isInstructionVisible ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute h-full flex items-end">
          <div className="h-1/6 md:pt-12">
            <div
              className={`w-fit h-fit bg-white rounded-full shadow-md hover:bg-stone-300 transition-all duration-50 ${
                isInstructionVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                className={`text-gray-800 font-mono font-extrabold text-base md:text-xl p-2 transition-opacity duration-100 ${
                  isInstructionVisible ? "opacity-100" : "opacity-0"
                }`}
                onTouchStart={() => setIsInstructionVisible(false)}
                onClick={() => setIsInstructionVisible(false)}
              >
                Ok, Got it!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full h-full top-0 z-50 ${
          isLoaderVisible ? "visible" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-32 sm:w-36 md:w-40  aspect-square flex flex-col items-center justify-center p-10">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-full aspect-square text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <footer
        className={`absolute bottom-0 left-0 w-full h-20 flex items-center justify-center text-center font-mono transition-all duration-100  ${
          isInstructionVisible || isMenuVisible ? "opacity-0" : "opacity-100"
        } ${isLoaderVisible ? "text-white" : ""}`}
      >
        {isLoaderVisible ? (
          "Loading :: This might take a while on mobile..."
        ) : (
          <>
            Another Project by
            <a
              href="https://github.com/Jorioz"
              className="font-bold ml-2 underline"
              target="_blank"
            >
              Jorio
            </a>
          </>
        )}
      </footer>
      <main
        className={`flex h-svh flex-col items-center justify-center transition-all duration-500   ${
          isInstructionVisible || isMenuVisible || isLoaderVisible
            ? "bg-[rgba(0,0,0,0.5)]"
            : "bg-[rgba(0,0,0,0.0)]"
        }`}
      >
        <div
          className={`md:h-128 md:w-128 sm:h-96 sm:w-96 w-72 h-72 relative transition-all duration-200 ${
            isMenuVisible ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
            <div className="col-span-3 row-span-3 bg-transparent"></div>
            <div
              className="col-span-1 row-span-3 my-4 relative cursor-pointer flex justify-center"
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
              <div className="w-full h-full rounded-full shadow-stem-inner-top grid grid-rows-4 items-center relative">
                <LightModule colors={randomPalette} volume={vocalsVolume} />
              </div>
            </div>
            <div className="col-span-3 row-span-3 bg-transparent"></div>

            <div
              className="col-span-3 row-span-1 mx-4 relative flex items-center cursor-pointer"
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
              <div className="w-full h-full rounded-full shadow-stem-inner-top grid grid-cols-4 items-center relative">
                <LightModule colors={randomPalette} volume={bassVolume} />
              </div>
            </div>
            <div className="col-span-1 row-span-1" id="middle">
              <div className="w-full h-full rounded-full shadow-stem-inner-mid flex justify-center items-center">
                <AudioPlayer
                  tracks={tracksData}
                  selectedTrack={selectedTrack}
                  setIsLoaderVisible={setIsLoaderVisible}
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
                <LightModule colors={randomPalette} volume={drumsVolume} />
              </div>
            </div>
            <div className="col-span-3 row-span-3 bg-transparent"></div>
            <div
              className="col-span-1 row-span-3 my-4 relative cursor-pointer flex justify-center items-center"
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
                <LightModule colors={randomPalette} volume={otherVolume} />
              </div>
            </div>
            <div className="col-span-3 row-span-3 bg-transparent"></div>
          </div>
          <div className="w-full h-full bg-[#c4a89c] rounded-full shadow-stem-shadow"></div>
        </div>
      </main>
    </>
  );
}
