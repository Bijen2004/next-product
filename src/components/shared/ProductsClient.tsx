"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import ProductFilters from "@/components/shared/ProductFilters";
import ProductCard from "@/components/shared/ProductCard";
import type { Product } from "@/types/product";

const PAGE_SIZE = 8;

type ProductsClientProps = {
  products: Product[];
  categories: string[];
  initialPage: number;
  initialCategory: string;
  initialMinPrice: string;
  initialMaxPrice: string;
  initialSearch: string;
  sort: "asc" | "desc";
};

const ProductsClient = ({
  products,
  categories,
  initialPage,
  initialCategory,
  initialMinPrice,
  initialMaxPrice,
  initialSearch,
  sort,
}: ProductsClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredProducts = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = search
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesMin = min !== null ? product.price >= min : true;
      const matchesMax = max !== null ? product.price <= max : true;
      return matchesCategory && matchesSearch && matchesMin && matchesMax;
    });
  }, [products, selectedCategory, search, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(start, start + PAGE_SIZE);

  const handleSortChange = (value: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const updateFilterParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/products?${params.toString()}`);
  };

  const handleClear = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("min");
    params.delete("max");
    params.delete("search");
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full lg:max-w-[250px] lg:shrink-0">
          <div className="lg:sticky lg:top-6 space-y-6 rounded-2xl border p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Sort</p>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={sort}
                onChange={(event) =>
                  handleSortChange(event.target.value as "asc" | "desc")
                }
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              search={search}
              onCategoryChange={(value) => {
                setSelectedCategory(value);
                updateFilterParam("category", value);
              }}
              onMinPriceChange={(value) => {
                setMinPrice(value);
                updateFilterParam("min", value);
              }}
              onMaxPriceChange={(value) => {
                setMaxPrice(value);
                updateFilterParam("max", value);
              }}
              onSearchChange={(value) => {
                setSearch(value);
                updateFilterParam("search", value);
              }}
              onClear={handleClear}
            />
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div>
            <p className="text-2xl font-semibold">Products</p>
            <p className="text-sm text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length} items.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/products/${product.id}`}
              />
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductsClient;