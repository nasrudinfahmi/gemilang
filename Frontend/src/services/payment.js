async function payment({
  transactionDetails,
  customerDetails,
  products,
  serviceFee,
}) {
  try {
    const url =
      import.meta.env.VITE_PRODUCTION == "true"
        ? import.meta.env.VITE_API_URL_PROD + "/transaction/payment"
        : import.meta.env.VITE_API_URL_DEV + "/transaction/payment";

    const datas = {
      transactionDetails,
      customerDetails,
      products,
      serviceFee,
    };

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { payment };
