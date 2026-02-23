import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/fakeStore";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/shared/AddToCartButton";

type ProductDetailProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const { id } = await params;
  console.log(id)
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    notFound();
  }

  let product: Product;
  try {
    product = await getProductById(productId);
    console.log(product)
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        ← Back to products
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative w-full aspect-square bg-muted/30 rounded-3xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ★ ({product.rating.count} reviews)
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;