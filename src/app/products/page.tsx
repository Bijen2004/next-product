import type { Metadata } from "next";
import ProductsClient from "@/components/shared/ProductsClient";
import { getCategories, getProducts } from "@/lib/fakeStore";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Products | Fake Store",
  description: "Browse products from the Fake Store catalog.",
};

type ProductsPageProps = {
  searchParams: Promise<{
    sort?: string;
    page?: string;
    category?: string;
    min?: string;
    max?: string;
    search?: string;
  }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const {
    sort = "asc",
    page = "1",
    category = "",
    min = "",
    max = "",
    search = "",
  } = await searchParams;
  const safeSort = sort === "desc" ? "desc" : "asc";
  let products: Product[] = [];
  let categories: string[] = [];

  try {
    products = await getProducts(safeSort);
    categories = await getCategories();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products.";
    throw new Error(message);
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <ProductsClient
        products={products}
        categories={categories}
        initialPage={Number(page) > 0 ? Number(page) : 1}
        initialCategory={category}
        initialMinPrice={min}
        initialMaxPrice={max}
        initialSearch={search}
        sort={safeSort}
      />
    </div>
  );
};

export default ProductsPage;