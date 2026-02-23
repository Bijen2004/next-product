import React from "react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

const ErrorState = ({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="w-full py-12 flex items-center justify-center text-center">
      <div className="space-y-3 max-w-md">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Try Again
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorState;