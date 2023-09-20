import { useState, useEffect } from "react";

function useHttpPut(url, token, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPutRequest = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        // Add other headers if needed
        "Content-Type": "application/json", // Adjust the content type as required
      };

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally, you can trigger the PUT request automatically
    // when dependencies change, if needed.
    // sendPutRequest();
  }, [dependencies]);

  return { data, loading, error, sendPutRequest };
}

export default useHttpPut;
