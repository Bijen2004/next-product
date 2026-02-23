"use client";

import ErrorState from "@/components/shared/ErrorState";

type ErrorProps = {
  reset: () => void;
};

const Error = ({ reset }: ErrorProps) => {
  return (
    <ErrorState
      title="Unable to load products"
      description="Please refresh and try again."
      onRetry={reset}
    />
  );
};

export default Error;