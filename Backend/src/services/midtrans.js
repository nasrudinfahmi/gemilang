import snap from "../config/midtrans.js";

async function createTransaction(parameter) {
  try {
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction;

    return transactionToken;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { createTransaction };
