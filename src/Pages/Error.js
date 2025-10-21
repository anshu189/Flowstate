import { useRouteError } from "react-router";

export const MainError = () => {
  const err = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-2xl md:text-3xl font-semibold text-blue-300">
        {err.status}: {err.statusText}
      </p>
    </div>
  );
};

export const NetworkError = () => {
  return (
    <div className="flex flex-col gap-1 w-full h-full text-[22px]">
      <p className="font-semibold text-red-700">Network Error</p>
      <p>Try again in sometime.</p>
    </div>
  );
};

export const ProductnotFound = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <p className="font-semibold text-[20px]">Product does not exist.</p>
      <p className="font-light text-[18px]">Try searching something else.</p>
    </div>
  );
};
