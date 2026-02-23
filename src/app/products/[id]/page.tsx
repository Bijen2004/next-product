import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/fakeStore";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/shared/AddToCartButton";

type ProductDetailProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: ProductDetailProps): Promise<Metadata> => {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return {
      title: "Product Not Found | Fake Store",
    };
  }

  try {
    const product = await getProductById(productId);
    return {
      title: `${product.title} | Fake Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image }],
      },
    };
  } catch {
    return {
      title: "Product Not Found | Fake Store",
    };
  }
};

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    notFound();
  }

  let product: Product;
  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    sku: String(product.id),
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      ratingCount: product.rating.count,
    },
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;