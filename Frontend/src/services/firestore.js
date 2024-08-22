import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

    if (querySnapshot.empty) return [];

    const datas = querySnapshot.docs.map((doc) => {
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

async function updateData(path, id, newData) {
  try {
    const dataRef = doc(db, path, id);
    await updateDoc(dataRef, newData);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getProductsBySellerId(sellerId) {
  try {
    // Referensi ke koleksi 'products'
    const productsRef = collection(db, "products");

    // Membuat query untuk mendapatkan produk dengan idSeller tertentu
    const q = query(productsRef, where("seller.idSeller", "==", sellerId));

    // Menjalankan query dan mendapatkan snapshot dokumen
    const querySnapshot = await getDocs(q);

    // Mengumpulkan data produk dari snapshot dokumen
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });

    // Mengembalikan data produk
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteData(path) {
  try {
    await deleteDoc(doc(db, path));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCartProduct({ idProduct, idUser }) {
  try {
    const cartRef = collection(db, "carts");
    const q = query(
      cartRef,
      where("idUser", "==", idUser),
      where("idProduct", "==", idProduct)
    );
    const querySnapshot = await getDocs(q);

    let cartProduct = null;
    querySnapshot.forEach((doc) => {
      cartProduct = { ...doc.data(), id: doc.id };
    });

    return cartProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCarts(idUser) {
  try {
    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("idUser", "==", idUser));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return [];

    let cartProduct = [];
    querySnapshot.forEach((doc) => {
      cartProduct.push({ ...doc.data(), id: doc.id });
    });

    return cartProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCarts(idUser) {
  try {
    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("idUser", "==", idUser));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Carts Tidak ditemukan!");

    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting carts: ", error.message);
    throw new Error(error.message);
  }
}

async function getProductsByName(productName) {
  try {
    const dataProducts = await readDatas("products");
    if (dataProducts.length === 0) return [];

    const products = dataProducts.filter((product) => {
      return product.productName
        ?.toLowerCase()
        ?.trim()
        ?.includes(productName.toLowerCase().trim());
    });

    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCartsByIdProduct(idProduct) {
  try {
    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("idProduct", "==", idProduct));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Carts Tidak ditemukan!");
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting carts: ", error.message);
    throw new Error(error.message);
  }
}

async function updateCartProduct(idProduct, newDataProduct) {
  try {
    const cartRef = collection(db, "carts");
    const q = query(cartRef, where("idProduct", "==", idProduct));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Carts Tidak ditemukan!");
    const updateCarts = querySnapshot.docs.map((doc) => {
      let cart = {
        id: doc.id,
        ...doc.data(),
      };

      cart.product = newDataProduct;
      setData(`carts/${cart.id}`, cart);
    });

    await Promise.all(updateCarts);
  } catch (error) {
    console.error("Error update cart product: ", error.message);
    throw new Error(error.message);
  }
}

async function fetchProducts() {
  try {
    const products = await readDatas("products");
    return products;
  } catch (error) {
    console.log("Gagal fetch products", error.message);
  }
}

export {
  readData,
  readDatas,
  setData,
  updateData,
  getProductsBySellerId,
  deleteData,
  getCartProduct,
  getCarts,
  deleteCarts,
  getProductsByName,
  deleteCartsByIdProduct,
  updateCartProduct,
  fetchProducts,
};
