/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { icons } from "../../assets"
import useResizeWindow from "../../hooks/useResizeWindow"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../lib/firebase/init"
import { logout } from "../../services/authentication"

function Navbar({ withNavBottom = true, withBackLink = false }) {
  const { windowWidth } = useResizeWindow()
  const [isLogin, setIsLogin] = useState(false)
  const [searchParams] = useSearchParams()
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "")
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSearchKey(searchParams.get("search") || "")
  }, [searchParams])


  const photoProfile = auth.currentUser?.photoURL || icons.defaultAvatar

  const handleSearch = (e) => {
    e.preventDefault()
    const key = searchKey.trim()
    navigate(`/products?search=${key}`)
  }

  return (
    <nav className="border padding-inline pt-2.5 pb-3 min-[600px]:pt-3 min-[600px]:pb-4">
      <section className="flex justify-between items-center gap-5 min-[600px]:gap-8">
        {windowWidth < 600 && withBackLink && (
          <Link to={-1} className='grid outline-slate-400 place-content-center size-8 p-0.5 rounded-full hover:-translate-x-1 hover:outline outline-1 transition-all' title='Kembali' aria-label='Halaman sebelumnya'>
            <img src={icons.left} alt="kembali" />
          </Link>
        )}
        {windowWidth >= 600 && (
          <div className='flex items-center gap-4'>
            {withBackLink && (
              <Link to={-1} className='grid outline-slate-400 translate-y-0.5 place-content-center size-8 p-0.5 rounded-full hover:-translate-x-1 hover:outline outline-1 transition-all' title='Kembali' aria-label='Halaman sebelumnya'>
                <img src={icons.left} alt="kembali" />
              </Link>
            )}
            <Link to="/" className="flex"><h1 className="text-3xl lg:text-3xl m-auto">Gemilang</h1></Link>
          </div>
        )}

        <form className="w-2/3 min-[600px]:w-1/2 lg:max-w-96 flex outline outline-1 outline-slate-400 rounded-md" onSubmit={handleSearch}>
          <label htmlFor="search-product" className="flex-1">
            <input
              type="search"
              name="search"
              id="search-product"
              aria-label="Cari Produk"
              placeholder="Cari produk ..."
              spellCheck="false"
              autoComplete="off"
              title="Cari produk"
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              className="w-full pl-2 pr-1.5 py-0.5 text-lg outline-none border-none"
            />
          </label>
          <button aria-label="submit cari produk" className="basis-9 grid place-content-center rounded-r-lg border-l border-slate-400 bg-slate-50 hover:bgsla">

            <img src={icons.search} alt="search icon" width={24} height={24} />
          </button>
        </form>

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
      </section>

      {withNavBottom && windowWidth > 640 && (
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

Navbar.propTypes = {
  withNavBottom: PropTypes.bool,
  withBackLink: PropTypes.bool,
}

export default Navbar