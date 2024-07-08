import { Link } from "react-router-dom"
import { icons } from "../../../assets"
import useResizeWindow from "../../../hooks/useResizeWindow"
import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../lib/firebase/init"
import { logout } from "../../../services/authentication"

function Navbar() {
  const { windowWidth } = useResizeWindow()
  const [isLogin, setIsLogin] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  })

  return (
    <nav className="border padding-inline pt-1 pb-2 min-[600px]:pt-3">
      <section className="flex justify-between items-center gap-5 min-[600px]:gap-8">
        {windowWidth > 600 && (
          <Link className="flex"><h1 className="bg-red-40 text-2xl lg:text-3xl m-auto">Gemilang</h1></Link>
        )}

        <label htmlFor="search-product" className="flex outline outline-1 outline-slate-400 px-2 rounded-lg flex-1 max-w-96">
          <img src={icons.search} alt="search icon" width={24} height={24} className="select-none" />
          <input
            type="search"
            name="search-product"
            id="search-product"
            aria-label="Cari Produk"
            placeholder="cari produk ..."
            spellCheck="false"
            autoComplete="off"
            className="w-full pl-1.5 pr-1.5 py-0.5 text-lg outline-none border-none"
          />
        </label>

        <div className="flex gap-3 lg:gap-5">
          {windowWidth > 340 && (
            <Link>
              <img src={icons.notification} alt="notifikasi icon" width={28} height={28} />
            </Link>
          )}
          <Link>
            <img src={icons.cart} alt="cart icon" width={28} height={28} />
          </Link>
          <div className="relative">
            <Link className="peer">
              <img src={icons.defaultAvatar} alt="avatar icon" width={28} height={28} />
            </Link>
            <div className="hidden peer-focus:flex peer-hover:flex hover:flex flex-col gap-1 h-max absolute -right-4 top-full border bg-white p-3 rounded-lg shadow-lg">
              {isLogin ? (
                <>
                  <Link title="profil" aria-label="profil" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Profil</Link>
                  <Link title="pesanan" aria-label="pesanan" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Pesanan</Link>
                  <Link title="notifikasi" aria-label="notifikasi" className="px-4 py-1.5 w-32 rounded-md leading-tight bg-white hover:outline outline-1 outline-slate-200 hover:bg-blue-50 transition-colors">Notifikasi</Link>
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
      </section>

      {windowWidth > 640 && (
        <section className="flex gap-3 mt-6 xl:mt-7 justify-center">
          <Link className="px-1 md:px-2">Kategori</Link>
          <Link className="px-1 md:px-2">Tagihan</Link>
          <Link className="px-1 md:px-2">Investasi</Link>
          <Link className="px-1 md:px-2">Hobi</Link>
          <Link className="px-1 md:px-2">Dapur</Link>
          <Link className="px-1 md:px-2">Otomotif</Link>
          <Link className="px-1 md:px-2">Elektronik</Link>
          {windowWidth > 1023 && (
            <>
              <Link className="px-1 md:px-2">Otomotif</Link>
              <Link className="px-1 md:px-2">Elektronik</Link>
              <Link className="px-1 md:px-2">Elektronik</Link>
            </>
          )}
        </section>
      )}
    </nav>
  )
}

export default Navbar