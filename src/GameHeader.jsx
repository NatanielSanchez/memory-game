export default function GameHeader() {
  return (
    <header className="flex h-fit items-center justify-evenly bg-purple-300 p-3 shadow-lg shadow-purple-900">
      <img
        src="pepegeThink.webp"
        alt="IMAGE NOT LOADED"
        className="hidden h-32 md:block"
      />
      <h1 className="font-mgs1 text-shadow-title text-center text-5xl tracking-wide">
        MEMORY GAME
      </h1>
      <p className="font-mgs1 text-shadow hidden text-center text-3xl tracking-wide lg:block">
        Test your memory in this super cool game!
      </p>
      <img
        src="ReallyCool.png"
        alt="IMAGE NOT LOADED"
        className="hidden h-32 md:block"
      />
    </header>
  );
}
