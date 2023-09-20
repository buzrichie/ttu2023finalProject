import { useState } from "react";

const usePostFetch = (url, authToken) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (formData) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization header with the authToken
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(error);
      }

      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return { data, loading, error, postData };
};

export default usePostFetch;
