"use client";

import { Input } from "@/components/ui/input";

type ProductFiltersProps = {
  categories: string[];
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
};

const ProductFilters = ({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  search,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearchChange,
  onClear,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="space-y-2 text-sm font-medium">
        Search
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products"
        />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Category
        <select
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium">
        Min Price
        <Input
          value={minPrice}
          type="number"
          min="0"
          onChange={(event) => onMinPriceChange(event.target.value)}
          placeholder="0"
        />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Max Price
        <Input
          value={maxPrice}
          type="number"
          min="0"
          onChange={(event) => onMaxPriceChange(event.target.value)}
          placeholder="500"
        />
      </label>

      <div>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;