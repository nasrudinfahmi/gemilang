import Aside from "../../components/aside/asideProfile/AsideProfile"
import Menus from "../../components/aside/asideProfile/Menus"
import NavbarProfile from "../../components/navbar/NavbarProfile"
import { menusAsideDashboard } from "../../constants/constant"
import FormAddProduct from "./components/FormAddProduct"

function AddProductFeature() {
  return (
    <>
      <header>
        <NavbarProfile title="Tambah Produk" />
      </header>
      <main className="w-full mt-8 px-6 sm:pl-12 md:pl-72 py-2 pb-10 transition-transform">
        <Aside>
          <Menus menus={menusAsideDashboard} />
        </Aside>
        <FormAddProduct />
      </main>
    </>
  )
}

export default AddProductFeature