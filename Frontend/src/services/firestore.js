import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase/init";

async function readData(coll, docId) {
  try {
    const docRef = doc(db, coll, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Data Tidak Ditemukan!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function readDatas(coll) {
  try {
    const querySnapshot = await getDocs(collection(db, coll));

    const datas = querySnapshot.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return datas;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function setData(path, data) {
  try {
    await setDoc(doc(db, path), data);
  } catch (error) {
    throw new Error(error.message);
  }
}

export { readData, readDatas, setData };
