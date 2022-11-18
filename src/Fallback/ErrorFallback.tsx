import { CTAButton } from "../Button/CTAButton";

export const errorLogger = (error: Error, info: { componentStack: string }) => {
  console.log("error in fallback", error, info);
};

export function ErrorFallback({ error, resetError }) {
  console.error(error);
  const reset = () => {
    resetError();
    localStorage.clear();
  };
  return (
    <div className="bg-slate-300 w-1/2 p-4 rounded-md">
      <p>
        Something went wrong! We've logged the error.
        <div className="py-4 text-red-800 font-semibold">
          {error.toString()}
        </div>
        <CTAButton
          label={"Reset Local Storage and Try Again"}
          onClick={reset}
        />
      </p>
    </div>
  );
}
