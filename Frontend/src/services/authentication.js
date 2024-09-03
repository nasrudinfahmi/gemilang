import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../lib/firebase/init";
import { Toast } from "../lib/sweetalert2/init";

function logout() {
  signOut(auth)
    .then(() => {
      Toast.fire({
        title: "Logout sukses",
        icon: "success",
      });
    })
    .catch(() => {
      Toast.fire({
        title: "Tidak dapat logout",
        icon: "error",
      });
    });
}

function deleteAccountPermanent() {
  deleteUser(auth.currentUser)
    .then(() => {
      Toast.fire({
        title: "Hapus akun berhasil",
        icon: "success",
      });
    })
    .catch((error) => {
      console.log(error);
      Toast.fire({
        title: "Gagal menghapus akun.",
        icon: "error",
      });
    });
}

export { logout, deleteAccountPermanent };
