"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/shared/QuantityStepper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, removeItem, updateQuantity } from "@/store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-lg font-semibold">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Cart</p>
          <p className="text-sm text-muted-foreground">
            Review your selected products.
          </p>
        </div>
        <Button variant="outline" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border p-4 md:flex-row md:items-center"
            >
              <div className="relative h-24 w-24 rounded-xl bg-muted/30">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <QuantityStepper
                  quantity={item.quantity}
                  onIncrement={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  onDecrement={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                />
                <Button
                  variant="secondary"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-6 space-y-4 h-fit">
          <p className="text-lg font-semibold">Order Summary</p>
          <div className="flex items-center justify-between text-sm">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              dispatch(clearCart());
              toast.success("Order has been placed.");
              router.push("/products");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;