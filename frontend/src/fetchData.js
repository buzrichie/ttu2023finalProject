const fetchData = async (url, requestData, authToken) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add the Authorization header with the authToken
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

export default fetchData;
