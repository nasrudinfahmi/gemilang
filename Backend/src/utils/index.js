import { FRONT_END_URL } from "../../constants/index.js";

function generateRandomId(type = "", length = 17) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (type) return `${type}-${result}`;
  return result;
}

function errorResponse({ res, statusCode = 500, errorMsg }) {
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMsg || "Internal Server Error!",
  });
}

function successResponse({ res, statusCode = 200, successMsg, data }) {
  res.status(statusCode).json({
    success: true,
    status: statusCode,
    message: successMsg || "Berhasil Mendapatkan Data",
    ...data,
  });
}

function generateDataMidtrans({
  transactionDetails,
  customerDetails,
  products,
  serviceFee,
}) {
  if (!transactionDetails || !customerDetails || !products || !serviceFee) {
    return null;
  }

  const dataMidtrans = {
    transaction_details: {
      order_id: transactionDetails.orderId,
      gross_amount: transactionDetails.grossAmount,
    },
    customer_details: {
      first_name: customerDetails.displayName,
      email: customerDetails.email,
      phone: customerDetails.phoneNumber,
      billing_address: {
        first_name: customerDetails.displayName,
        email: customerDetails.email,
        phone: customerDetails.phoneNumber,
        address: `${customerDetails.address.kecamatan.label}, ${customerDetails.address.kabKota.label}, ${customerDetails.address.provinsi.label}`,
        city: customerDetails.address.kabKota.label,
        postal_code: customerDetails.address.kodepos.label,
        country_code: "IDN",
      },
    },
    item_details: [],
    shipping_address: {
      first_name: customerDetails.displayName,
      email: customerDetails.email,
      phone: customerDetails.phoneNumber,
      address: `${customerDetails.address.kecamatan.label}, ${customerDetails.address.kabKota.label}, ${customerDetails.address.provinsi.label}`,
      city: customerDetails.address.kabKota.label,
      postal_code: customerDetails.address.kodepos.label,
      country_code: "IDN",
    },
  };

  dataMidtrans.item_details = products.map((product) => {
    return {
      id: product.idProduct,
      name: product.product.productName,
      quantity: product.quantity,
      price: product.product.price,
      url: `${FRONT_END_URL}/${product.idProduct}`,
      brand: product.product.brand,
      category: product.product.category,
    };
  });

  dataMidtrans.item_details.push(
    {
      name: "Biaya Pelayanan",
      price: serviceFee.tax,
      quantity: 1,
      id: "tax-" + generateRandomId(),
    },
    {
      name: "Diskon",
      price: "-" + serviceFee.discount,
      quantity: 1,
      id: "disc-" + generateRandomId(),
    },
    {
      name: "Ongkir",
      price: serviceFee.shipping,
      quantity: 1,
      id: "shipp-" + generateRandomId(),
    }
  );

  return dataMidtrans;
}

export {
  generateRandomId,
  errorResponse,
  successResponse,
  generateDataMidtrans,
};
