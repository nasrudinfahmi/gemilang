const PORT = process.env.PORT;
const DEV_URL = process.env.DEV;
const PROD_URL = process.env.PROD;
const PRODUCTION = process.env.PRODUCTION;
const IS_PRODUCTION = PRODUCTION === "true";
const SERVER_KEY = process.env.SERVER_KEY;

const FRONT_END_URL = IS_PRODUCTION ? PROD_URL : DEV_URL;

export { PORT, DEV_URL, PROD_URL, IS_PRODUCTION, SERVER_KEY, FRONT_END_URL };
