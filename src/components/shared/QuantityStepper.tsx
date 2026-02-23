"use client";

import { Button } from "@/components/ui/button";

type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-2 py-1">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onDecrement}
        className="h-7 w-7 rounded-full p-0"
      >
        -
      </Button>
      <span className="min-w-6 text-center text-sm font-medium">
        {quantity}
      </span>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onIncrement}
        className="h-7 w-7 rounded-full p-0"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityStepper;