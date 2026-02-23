type ApiError = {
  message: string;
  status: number;
};

const API_BASE_URL = "https://fakestoreapi.com";

const buildUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const fetchJson = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error: ApiError = {
      message: "Request failed.",
      status: response.status,
    };

    try {
      const text = await response.text();
      if (text) {
        error.message = text;
      }
    } catch {
      // ignore body parsing errors
    }

    throw error;
  }

  return (await response.json()) as T;
};