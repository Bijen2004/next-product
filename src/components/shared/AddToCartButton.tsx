"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, updateQuantity } from "@/store/slices/cartSlice";
import type { Product } from "@/types/product";
import QuantityStepper from "@/components/shared/QuantityStepper";

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success("Added to cart.");
  };

  if (cartItem) {
    return (
      <QuantityStepper
        quantity={cartItem.quantity}
        onIncrement={() =>
          dispatch(
            updateQuantity({
              id: product.id,
              quantity: cartItem.quantity + 1,
            })
          )
        }
        onDecrement={() =>
          dispatch(
            updateQuantity({
              id: product.id,
              quantity: cartItem.quantity - 1,
            })
          )
        }
      />
    );
  }

  return (
    <Button size="lg" onClick={handleAdd}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;