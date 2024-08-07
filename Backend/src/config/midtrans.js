import midtransClient from "midtrans-client";
import { IS_PRODUCTION, SERVER_KEY } from "../../constants/index.js";

const snap = new midtransClient.Snap({
  isProduction: IS_PRODUCTION,
  serverKey: SERVER_KEY,
});

export default snap;
