function getFileNameFromUrl(url) {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/gemilango.appspot.com/o/";

  if (!url || !url.includes(baseUrl)) return null;

  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const fileName = lastPart.split("?")[0];

  return decodeURIComponent(fileName);
}

function generateRandomId(length = 17) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export { getFileNameFromUrl, generateRandomId };
