import { useState } from "react";

interface TracksProps {
  title: string;
  artist: string;
  tags: string;
  src: string;
  id: string;
  tagColor: string;
  extra?: string;
  extraColor?: string;
  toggleLoading: () => void;
  setIsTrackSelected: (id: string) => void;
}

function Tracks({
  title,
  artist,
  tags,
  src,
  id,
  tagColor,
  extra,
  extraColor,
  setIsTrackSelected,
  toggleLoading,
}: TracksProps) {
  const [isTrackSelected, setTrackSelected] = useState(false);

  const handleClick = () => {
    setTrackSelected(!isTrackSelected);
    setIsTrackSelected(id);
    toggleLoading();
  };

  return (
    <button className="text-left" onClick={handleClick}>
      <div className={`w-full flex h-28 md:h-32 p-2 my-2 hover:bg-stone-200 `}>
        <img className="w-auto h-full shadow-md mr-2 rounded-md" src={src} />
        <div className="flex flex-col justify-center flex-1">
          <div className="mx-1 font-bold">{title}</div>
          <div className="mx-1">{artist}</div>
          <div
            className={`mx-1 mt-1 rounded-full flex justify-center px-5 items-center text-center text-sm w-fit ${tagColor}`}
          >
            <h1 className="">{tags}</h1>
          </div>
          <div
            className={`mx-1 mt-1 rounded-full flex justify-center px-5 items-center text-center text-sm w-fit ${extraColor}`}
          >
            <h1 className="">{extra}</h1>
          </div>
        </div>
      </div>
    </button>
  );
}

export default Tracks;
