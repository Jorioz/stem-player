

export default function Home() {
  return (
    <main className="flex h-svh flex-col items-center justify-between">
      <div>Stem Player</div>
      <div className="md:h-128 md:w-128 sm:h-96 sm:w-96 w-72 h-72 relative">
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div className="col-span-1 row-span-3 my-4" id="top">
            <div className="w-full h-full rounded-full shadow-stem-inner-top"></div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>

          <div className="col-span-3 row-span-1 mx-4" id="left">
          <div className="w-full h-full rounded-full shadow-stem-inner-left"></div>
          </div>
          <div className="col-span-1 row-span-1" id="middle">
            <div className="w-full h-full rounded-full shadow-stem-inner-mid flex justify-center items-center">
              <div className="w-[90%] h-[90%] rounded-full bg-[#c4a89c] hover:bg-[#c2a497] shadow-stem-inner-button cursor-pointer"></div>
            </div>
          </div>
          <div className="col-span-3 row-span-1 mx-4" id="right">
          <div className="w-full h-full rounded-full shadow-stem-inner-right"></div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>
          <div className="col-span-1 row-span-3 my-4" id="bottom">
          <div className="w-full h-full rounded-full shadow-stem-inner-bottom"></div>
          </div>
          <div className="col-span-3 row-span-3 bg-transparent"></div>

        </div>
        <div className="w-full h-full bg-[#c4a89c] rounded-full shadow-stem-shadow"></div>
      </div>
      <div>Another Project by <a href="https://github.com/Jorioz" className="font-bold" target="_blank">Jorio</a></div>
    </main>
  );
}
