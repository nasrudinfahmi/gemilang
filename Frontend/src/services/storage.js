import { storage } from "../lib/firebase/init";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);

  const fileUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
  return fileUrl;
}

async function deleteFile(path, fileName) {
  try {
    const storageRef = ref(storage, `${path}/${fileName}`);

    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
    throw new Error("Ada Sesuatu yang Salah!");
  }
}

export { uploadFile, deleteFile };
