import { signOut } from "firebase/auth";
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

export { logout };
