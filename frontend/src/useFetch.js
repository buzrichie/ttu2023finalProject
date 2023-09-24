import { useState, useEffect } from "react";

// Fetch - Get - with Authorization Header
const useFetch = (url, authToken) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

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
      const json = await response.json();

      if (!response.ok) {
        throw Error(json.error);
      }

      setData(json);
      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchDataGet();
  }, [url, authToken]); // Specify dependencies here

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
