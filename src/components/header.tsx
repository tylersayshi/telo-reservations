export const Header = () => {
  return (
    <header className="flex flex-col gap-1 p-6 lg:fixed lg:left-0 lg:top-0">
      <h2 className="text-lg font-bold tracking-tight">
        Telo Truck Reservations
      </h2>
      <a
        href="https://github.com/tylerlaws0n/telo-reservations"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-sm font-bold hover:underline"
      >
        <img src="/images/github.svg" alt="github" className="h-4 w-4" /> Source
      </a>
    </header>
  );
};
