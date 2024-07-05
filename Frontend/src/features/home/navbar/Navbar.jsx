import { Link } from "react-router-dom"
import { icons } from "../../../assets"
import useResizeWindow from "../../../hooks/useResizeWindow"

function Navbar() {
  const { windowWidth } = useResizeWindow()

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
          <Link>
            <img src={icons.defaultAvatar} alt="avatar icon" width={28} height={28} />
          </Link>
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