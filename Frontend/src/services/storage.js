import { storage } from "../lib/firebase/init";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getFileNameFromUrl } from "../utils/utils";

async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);

  const fileUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
  return fileUrl;
}

async function deleteFile(path, fileName) {
  try {
    if (!fileName) return;
    const storageRef = ref(storage, `${path}/${fileName}`);

    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
    throw new Error("Ada Sesuatu yang Salah!");
  }
}

async function saveImg({ path, fileName, file, urlToDelete }) {
  if (!file) return null;

  if (urlToDelete) {
    const fileName = getFileNameFromUrl(urlToDelete)?.split("/")[1];
    await deleteFile(path, fileName);
  }

  const pathUrl = `${path}/${fileName}`;
  const fileUrl = await uploadFile(pathUrl, file);

  return fileUrl;
}

export { uploadFile, deleteFile, saveImg };
