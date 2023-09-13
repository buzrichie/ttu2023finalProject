import { useState, useEffect } from "react";

const useFetch = (url, formData) => {
  const { data, setData } = useState(null);
  const { isPending, setIsPending } = useState(true);
  const { error, setError } = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    // Make a POST request to the appropriate API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        if (!response) {
          throw Error("Could not fetch data from that resource");
        }
        const data = await response.json();
        if (!response.ok) {
          setIsPending(false);
          setError(data);
          console.error("Login Error:", error);
        } else {
          setIsPending(false);
          setData(data);
          console.log("Success:", data);
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    };
    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
