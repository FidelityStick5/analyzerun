import { useEffect, useState } from "react";

export default function useFetchWithCache<T>(
  localStorageKey: string,
  url: string,
  initialData: T,
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const cachedData = localStorage.getItem(localStorageKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsLoading(false);

          return;
        }

        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);

        const result = await response.json();

        setData(result.data);
        setIsLoading(false);

        if (!result.data) return;

        localStorage.setItem(localStorageKey, JSON.stringify(result.data));
      } catch (error: any) {
        if (error.name === "AbortError") return console.log("Fetching aborted");

        setError(error.message);
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [localStorageKey, url]);

  return { data, isLoading, error };
}
