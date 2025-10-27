import { useNavigate, useRouteError } from "react-router";

export const MainError = () => {
  const navigate = useNavigate();
  const err = useRouteError();
  const fallbacktohome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="flex flex-col  items-center gap-2 text-2xl md:text-3xl font-semibold text-primarywhite">
        {err.status} - {err.statusText}
        <span className="text-sm font-light tracking-widest">
          This place is Dark, fallback to{" "}
          <span
            onClick={fallbacktohome}
            className="cursor-pointer underline underline-offset-2"
          >
            home
          </span>
        </span>
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
