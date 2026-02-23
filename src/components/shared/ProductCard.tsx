"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, updateQuantity } from "@/store/slices/cartSlice";
import type { Product } from "@/types/product";
import QuantityStepper from "@/components/shared/QuantityStepper";

type ProductCardProps = {
  product: Product;
  href?: string;
};

const ProductCard = ({ product, href }: ProductCardProps) => {
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

  return (
    <div className="border rounded-2xl p-4 flex flex-col gap-4 bg-card shadow-sm">
      <div className="relative w-full aspect-square bg-muted/30 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="font-medium line-clamp-2">{product.title}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {cartItem ? (
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
        ) : (
          <Button onClick={handleAdd} className="flex-1">
            Add to Cart
          </Button>
        )}
        {href ? (
          <Link
            href={href}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;