import { useContext, useEffect, useState } from "react"
import Aside from "../../components/aside/asideProfile/AsideProfile"
import Menus from "../../components/aside/asideProfile/Menus"
import NavbarProfile from "../../components/navbar/NavbarProfile"
import { menusAsideDashboard } from "../../constants/constant"
import Search from "./components/Search"
import TableProduct from "./components/TableProduct"
import { Link } from "react-router-dom"
import { getProductsBySellerId, readData } from "../../services/firestore"
import { UserContext } from "../../context/UserContext"
import { auth } from "../../lib/firebase/init"

function DashboardProductsFeature() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const { user, setUser } = useContext(UserContext)

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    (async function () {
      try {
        if (!user) {
          const responseUser = await readData("user", auth.currentUser.uid);
          setUser(responseUser)
        }

        const response = await readData("seller", user.idSeller);

        const productsResponse = await getProductsBySellerId(response.idSeller)
        setProducts(productsResponse)
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [setUser, user])

  return (
    <>
      <header>
        <NavbarProfile title="Produk Saya" />
      </header>
      <main className="w-full mt-8 px-6 sm:pl-12 md:pl-72 py-2 pb-10 transition-transform">
        <Aside>
          <Menus menus={menusAsideDashboard} />
        </Aside>
        <section>
          <div className="flex gap-5 flex-wrap">
            <Search value={search} handleSearch={handleSearch} />
            <Link
              to="add"
              title="Tambah Produk"
              aria-label="Tambah Produk"
              className="flex items-center px-3 rounded-md bg-slate-700 hover:bg-slate-800 text-white"
            >
              Tambah Produk
            </Link>
          </div>
          <TableProduct value={search} datas={products} />
        </section>
      </main>
    </>
  )
}

export default DashboardProductsFeature