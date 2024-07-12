import { Link, useLocation } from "react-router-dom"
import { menusAside } from "../../constant"

function Menus() {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col mt-7 gap-2">
      {menusAside.map(menu => (
        <Link key={menu.title} to={menu.href} aria-label={menu.title} title={menu.title} className={`${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname.includes(menu.href) && 'bg-slate-100'} rounded-md`}>
          {menu.title}
        </Link>
      ))}
    </div>
  )
}

export default Menus