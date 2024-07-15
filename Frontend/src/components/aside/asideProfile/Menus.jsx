import { Link, useLocation } from "react-router-dom"
import { menusAside } from "./menusConstans"
import { useUser } from "../../../hooks/useUser"
import { useEffect, useState } from "react"

function Menus() {
  const { pathname } = useLocation()
  const { user } = useUser()
  const [isSeller, setIsSeller] = useState()

  useEffect(() => {
    const seller = user?.role === 'seller' && user?.idSeller
    setIsSeller(seller)
  }, [user])

  return (
    <div className="flex flex-col mt-7 gap-2">
      {menusAside.map((menu, i) => (
        menu.title !== 'Mulai Jualan' ? (
          <Link
            key={i}
            to={menu.href}
            aria-label={menu.title}
            title={menu.title}
            className={`${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname.includes(menu.href) && 'bg-slate-100'} rounded-md`}>
            {menu.title}
          </Link>
        ) : (
          <Link
            key={i}
            to={!isSeller ? menu.href : '/dashboard'}
            aria-label={!isSeller ? menu.title : 'Dashboard'}
            title={!isSeller ? menu.title : 'Dashboard'}
            className={`${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname.includes(menu.href) && 'bg-slate-100'} rounded-md`}>
            {!isSeller ? menu.title : 'Dashboard'}
          </Link>
        )
      ))}
    </div>
  )
}

export default Menus