import { FC } from "react";

const ErrorFallback: FC = () => {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen grid place-content-center gap-4">
      <h1 className="text-input text-2xl text-center">Oops! Something went wrong.</h1>
      <h2 className="text-input text-5xl font-bold text-center">Refresh the page</h2>
      <div className="flex justify-center">
        <button
          className="bg-primary text-white font-bold rounded-full px-10 py-3.5"
          onClick={refresh}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
