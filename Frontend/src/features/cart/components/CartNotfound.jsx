import { Link } from "react-router-dom"

function CartNotfound() {
  return (
    <div>
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="overflow-hidden sm:rounded-lg pb-8">
          <div className="text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400">404</h1>
            <h1 className="text-6xl font-medium py-8">Keranjang Belanja Kosong!</h1>
            <p className="text-2xl pb-8 px-12 font-medium">Yuk Mulai Belanja</p>
            <Link to="/" aria-label="ke beranda" title="Beranda" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartNotfound