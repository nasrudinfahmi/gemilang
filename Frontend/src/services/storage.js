import { storage } from "../lib/firebase/init";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getFileNameFromUrl } from "../utils/utils";

async function uploadFile(path, file) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);

    const fileUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
    return fileUrl;
  } catch (error) {
    throw new Error(error.message);
  }
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

async function deleteFiles(path, filesUrl) {
  try {
    if (!filesUrl || filesUrl.length == 0) return;

    filesUrl.forEach(async (img) => {
      const fileName = getFileNameFromUrl(img).split("/")[1];
      await deleteFile(path, fileName);
    });
  } catch (error) {
    throw new Error("Ada Sesuatu yang Salah!");
  }
}

async function uploadFiles(path, files) {
  try {
    const storageRef = ref(storage, path);

    files.map(async (img) => {
      const snapshot = await uploadBytes(storageRef, img);

      const fileUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
      return fileUrl;
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function saveImgs({ path, fileName, files, urlsToDelete }) {
  try {
    const pathUpload = `${path}/${fileName}`;
    const imgsUrl = await uploadFiles(pathUpload, files);
    await deleteFiles(path, urlsToDelete);

    return imgsUrl;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { uploadFile, deleteFile, saveImg, deleteFiles, uploadFiles, saveImgs };
