import { useRouteError } from "react-router";

export const MainError = () => {
  const err = useRouteError();
  return (
    <div className="error-container">
      <p>
        {err.status}: {err.statusText}
      </p>
    </div>
  );
};

export const NetworkError = () => {
  return (
    <div className="network-error">
      <p>Network Error.</p>
      <p>Try again in sometime.</p>
    </div>
  );
};

export const ProductnotFound = () => {
  return (
    <div className="productnotfound-error">
      <p>Product do not Exist.</p>
      <p>Try searching something else.</p>
    </div>
  );
};
