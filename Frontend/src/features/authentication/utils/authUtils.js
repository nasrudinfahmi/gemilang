import { errorAuthFirebase } from "../services/constant";

function getErrorAuthentication(error) {
  let errMsg = error.message;

  for (const [key, value] of Object.entries(errorAuthFirebase)) {
    if (error.message.includes(key)) {
      return (errMsg = value);
    }
  }

  return errMsg;
}

export { getErrorAuthentication };
