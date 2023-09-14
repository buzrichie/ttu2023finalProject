import { useState, useEffect } from "react";

// Fetch - Get - with Authorization Header
const useFetch = (url, authToken) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchDataGet = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization header with the authToken
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch data");
        }

        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchDataGet();
  }, [url, authToken]); // Specify dependencies here

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
