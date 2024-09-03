import { Link } from "react-router-dom"
import { icons } from "../../../assets"
import useResizeWindow from "../../../hooks/useResizeWindow"
import { logout } from "../../../services/authentication"
import { auth } from "../../../lib/firebase/init"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"

function Navbar() {
  const { windowWidth } = useResizeWindow()
  const [isLogin, setIsLogin] = useState(false)
  const photoProfile = auth.currentUser?.photoURL || icons.defaultAvatar

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex justify-between border padding-inline py-2">
      <div className="flex items-center gap-4">
        <Link
          to={-1}
          title="kembali"
          aria-label="kembali"
          className="hover:bg-slate-50 hover:shadow-sm block w-max p-1.5 rounded-full">
          <img src={icons.left} alt="ikon kembali" width={21} height={21} />
        </Link>

        <h1 className="font-medium text-lg sm:text-xl">Detail Produk</h1>
      </div>

      <div className="flex gap-3 lg:gap-5 items-center justify-center">
        {windowWidth > 340 && (
          <Link title="Notifikasi" aria-label="Notifikasi">
            <img src={icons.notification} alt="notifikasi icon" width={28} height={28} />
          </Link>
        )}
        <Link to="/cart" title="Keranjang Belanja" aria-label="keranjang belanja">
          <img src={icons.cart} alt="cart icon" width={28} height={28} />
        </Link>
        <div className="relative grid place-content-center">
          <button type="button" className="peer" title="Profil" aria-label="Profil">
            <img src={photoProfile} alt="avatar icon" width={28} height={28} className="rounded-full overflow-hidden" />
          </button>
          <div className="hidden peer-focus:flex peer-hover:flex hover:flex flex-col gap-1 h-max absolute -right-4 top-full border bg-white p-3 rounded-lg shadow-lg">
            {isLogin ? (
              <>
                <Link to="/profile/me" title="Profil Saya" aria-label="profil" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Profil</Link>
                <Link title="pesanan" aria-label="Pesanan" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Pesanan</Link>
                <Link title="notifikasi" aria-label="Notifikasi" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Notifikasi</Link>
                <button type="button" onClick={logout} title="keluar" aria-label="keluar" className="text-left px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-red-200 hover:bg-red-100 transition-colors">Keluar</button>
              </>
            ) : (
              <>
                <Link to="/auth/login" title="login" aria-label="login" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Login</Link>
                <Link to="/auth/register" title="register" aria-label="register" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar