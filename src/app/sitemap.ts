import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/fakeStore";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = getBaseUrl();
  let products = [];

  try {
    products = await getProducts();
  } catch {
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
      },
    ];
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;