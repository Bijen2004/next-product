import { fetchJson } from "./api";
import type { Product } from "@/types/product";

export const getProducts = async (sort?: "asc" | "desc") => {
  const param = sort ? `?sort=${sort}` : "";
  return fetchJson<Product[]>(`/products${param}`);
};

export const getProductById = async (id: number) => {
  return fetchJson<Product>(`/products/${id}`);
};

export const getCategories = async () => {
  return fetchJson<string[]>("/products/categories");
};