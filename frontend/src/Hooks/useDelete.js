import { useState, useEffect } from "react";

const useDelete = (url, authToken) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchDataDelete = async () => {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization header with the authToken
            Authorization: `Bearer ${authToken}`,
          },
          signal, // Pass the signal to allow aborting the request
        });

        if (!response.ok) {
          throw Error("Could not process request");
        }

        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          // Request was aborted, don't update state
          return;
        }
        setIsPending(false);
        setError(error);
      }
    };

    fetchDataDelete();

    // Cleanup function to abort the request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, [url, authToken]); // Specify dependencies here

  return {
    data,
    isPending,
    error,
  };
};

export default useDelete;
