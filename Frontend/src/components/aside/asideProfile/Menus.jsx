import PropTypes from 'prop-types'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteAccount, deleteStore, readData, setData } from '../../../services/firestore'
import { useSeller } from '../../../context/SellerContext'
import { useUser } from '../../../hooks/useUser'
import LoadingUi from '../../../layouts/LoadingUi'
import { logout } from '../../../services/authentication'
import { confirmToast, inputToast, Toast } from '../../../lib/sweetalert2/init'
import Swal from 'sweetalert2'

function Menus({ menus }) {
  const { pathname } = useLocation()
  const [isSeller, setIsSeller] = useState()
  const { user, setUser, loading } = useUser()
  const { setSeller } = useSeller()
  const navigate = useNavigate()

  useEffect(() => {
    (async function fetch() {
      try {
        const seller = user?.role === 'seller' && !!user?.idSeller
        setIsSeller(seller)

        if (seller) {
          const responseSeller = await readData("seller", user.idSeller);
          setSeller(responseSeller)
        }
      } catch (error) {
        return
      }
    })()
  }, [setSeller, user])

  const handleBtnClick = async (title, href) => {
    if (!href) return;

    if (title === 'Keluar') {
      return logout()
    }
    if (title === 'Hapus Akun') {
      const confirm = confirmToast({
        title: 'Semua data akan terhapus!',
        text: 'Yakin hapus akun?',
        confText: 'Ya, hapus akun',
        cancelText: 'Batalkan',
      })
      const { isConfirmed } = await Swal.fire(confirm)

      if (!isConfirmed) return;

      const password = await inputToast({
        title: 'Masukkan password anda',
        type: 'text',
        label: 'Hapus permanen',
        confirmBtnText: 'Hapus akun',
        cancelBtnText: 'Batalkan'
      })

      if (!password) return;
      try {
        await deleteAccount(user, password)
        Toast.fire({
          icon: 'success',
          title: 'Akun berhasil dihapus.'
        })
        return;
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message,
        })
      }
      return;
    }
    if (title === 'Hapus Toko') {
      const confirm = confirmToast({
        title: 'Semua data produk akan terhapus!',
        text: 'Yakin hapus toko?',
        confText: 'Ya, hapus toko',
        cancelText: 'Batalkan',
      })
      const { isConfirmed } = await Swal.fire(confirm)
      if (!isConfirmed) return;
      await deleteStore(user)

      const responseUser = await readData("user", user.idUser);
      setUser({ ...responseUser, idSeller: null, role: 'buyer' })

      await setData(`/user/${responseUser.id}`,
        { ...responseUser, idSeller: null, role: 'buyer' })

      Toast.fire({
        icon: 'success',
        title: 'Toko berhasil dihapus.'
      })
      return navigate('/', { replace: true })
    }
    navigate(href)
  }

  return loading ? <LoadingUi /> : (
    <div className="flex flex-col mt-7 gap-2">
      {menus.map((menu, i) => (
        menu.title !== 'Mulai Jualan' ? (
          <button
            key={i}
            // to={menu?.href}
            onClick={async () => await handleBtnClick(menu.title, menu.href)}
            aria-label={menu.title}
            title={menu.title}
            className={`text-left ${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Hapus Toko' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' || menu.title == 'Hapus Toko' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname == menu.href ? 'bg-slate-100' : pathname == menu.href + '/add' && 'bg-slate-100'} rounded-md`}>
            {menu.title}
          </button>
        ) : (
          <button
            key={i}
            // to={!isSeller ? menu.href : '/dashboard'}
            onClick={async () => await handleBtnClick(menu.title, !isSeller ? menu.href : '/dashboard')}
            aria-label={!isSeller ? menu.title : 'Dashboard'}
            title={!isSeller ? menu.title : 'Dashboard'}
            className={`text-left ${menu.title == 'Pesan' && 'mt-4'} ${menu.title == 'Hapus Akun' && 'mt-4'} p-2 leading-tight ${menu.title !== 'Hapus Akun' && menu.title !== 'Keluar' && 'hover:bg-slate-200'} ${menu.title == 'Hapus Akun' && 'hover:bg-red-600 hover:text-white'} ${menu.title == 'Keluar' && 'hover:bg-slate-700 hover:text-white'} ${pathname == menu.href && 'bg-slate-100'} rounded-md`}>
            {!isSeller ? menu.title : 'Dashboard'}
          </button>
        )
      ))}
    </div>
  )
}

Menus.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Menus