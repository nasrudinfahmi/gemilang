import { createTransaction } from "../services/midtrans.js";
import {
  errorResponse,
  generateDataMidtrans,
  successResponse,
} from "../utils/index.js";

async function buy(req, res) {
  try {
    const { transactionDetails, customerDetails, products, serviceFee } =
      req.body;

    const dataMidtrans = generateDataMidtrans({
      transactionDetails,
      customerDetails,
      products,
      serviceFee,
    });

    if (!dataMidtrans) throw new Error("Gagal Melakukan Transaksi!");

    const trxToken = await createTransaction(dataMidtrans);

    return successResponse({
      res,
      successMsg: "Berhasil Membuat Snap Token",
      statusCode: 201,
      data: { trxToken },
    });
  } catch (error) {
    if (error.message == "Gagal Melakukan Transaksi!") {
      return errorResponse({
        res,
        errorMsg: error.message,
        statusCode: 400,
      });
    }

    return errorResponse({ res, errorMsg: error.message });
  }
}

export { buy };
