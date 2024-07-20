import PropTypes from 'prop-types'
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { readData } from '../../../services/firestore'
import { auth } from '../../../lib/firebase/init'
import { useSeller } from '../../../context/SellerContext'

function Menus({ menus }) {
  const { pathname } = useLocation()
  const [isSeller, setIsSeller] = useState()
  const { setSeller } = useSeller()

  useEffect(() => {
    (async function fetch() {
      try {
        const responseUser = await readData("user", auth.currentUser.uid);
        const seller = responseUser?.role === 'seller' && !!responseUser?.idSeller
        setIsSeller(seller)

        if (seller) {
          const responseSeller = await readData("seller", responseUser.idSeller);
          setSeller(responseSeller)
        }
      } catch (error) {
        return
      }
    })()
  }, [setSeller])

  return (
    <div className="flex flex-col mt-7 gap-2">
      {menus.map((menu, i) => (
        menu.title !== 'Mulai Jualan' ? (
          <Link
            key={i}
            to={menu?.href}
            aria-label={menu.title}
            title={menu.title}
            className={`${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Hapus Toko' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' || menu.title == 'Hapus Toko' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname == menu.href ? 'bg-slate-100' : pathname == menu.href + '/add' && 'bg-slate-100'} rounded-md`}>
            {menu.title}
          </Link>
        ) : (
          <Link
            key={i}
            to={!isSeller ? menu.href : '/dashboard'}
            aria-label={!isSeller ? menu.title : 'Dashboard'}
            title={!isSeller ? menu.title : 'Dashboard'}
            className={`${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname == menu.href && 'bg-slate-100'} rounded-md`}>
            {!isSeller ? menu.title : 'Dashboard'}
          </Link>
        )
      ))}
    </div>
  )
}

Menus.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Menus