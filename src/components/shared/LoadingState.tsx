import React from "react";

type LoadingStateProps = {
  message?: string;
};

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <span className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingState;