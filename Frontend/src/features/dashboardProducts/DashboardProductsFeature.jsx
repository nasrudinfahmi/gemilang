import { useContext, useEffect, useRef, useState } from "react"
import Aside from "../../components/aside/asideProfile/AsideProfile"
import Menus from "../../components/aside/asideProfile/Menus"
import NavbarProfile from "../../components/navbar/NavbarProfile"
import { menusAsideDashboard } from "../../constants/constant"
import Search from "./components/Search"
import TableProduct from "./components/TableProduct"
import { Link } from "react-router-dom"
import { getProductsBySellerId, readData, setData } from "../../services/firestore"
import { UserContext } from "../../context/UserContext"
import { auth } from "../../lib/firebase/init"
import FormProduct from "../../components/form/FormProduct"
import { generateRandomId } from "../../utils/utils"
import { deleteFiles, saveImg, uploadFile } from "../../services/storage"
import { Toast } from "../../lib/sweetalert2/init"

function DashboardProductsFeature() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const { user, setUser } = useContext(UserContext)
  const editorRef = useRef()
  const [productEdit, setProductEdit] = useState()
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)

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

  const handleChangeInput = e => {
    const key = e.target.name

    setProductEdit(prev => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  const handleImgProduct = e => {
    const key = e.target.name

    setFile(prev => ({
      ...prev,
      [key]: e.target.files
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      Toast.fire({
        icon: 'info',
        title: 'Loading ...',
        timer: 15100,
      })
      const description = editorRef.current.getContent()

      let datas = productEdit
      datas.description = description

      if (file?.thumbnailProduct) {
        const ext = file.thumbnailProduct[0].name.split('image/')[0]
        const filename = generateRandomId() + `.${ext}`
        const imgUrl = await saveImg({
          path: 'products',
          fileName: filename,
          file: file.thumbnailProduct[0],
          urlToDelete: productEdit.thumbnailProduct,
        })

        datas.thumbnailProduct = imgUrl
      }

      if (file?.deleteImg) {
        await deleteFiles('products', productEdit.imgs)
        datas.imgs = []
      }

      if (file?.imgs) {
        setFile(prev => ({ ...prev, deleteImg: false }))
        const imgs = file.imgs
        let imgsUrl = []

        if (productEdit.imgs.length > 0) {
          await deleteFiles('products', productEdit.imgs)
        }

        for (let i = 0; i < imgs.length; i++) {
          const imgExt = imgs[i].type.split('image/')[1]
          const imgName = generateRandomId() + `.${imgExt}`
          const imgUrl = await uploadFile(`products/${imgName}`, imgs[i])
          imgsUrl.push(imgUrl)
        }

        datas.imgs = imgsUrl
      }

      await setData(`products/${productEdit.idProduct}`, datas)
      setFile(prev => ({ ...prev, deleteImg: false }))
      Toast.fire({
        icon: 'success',
        title: 'Edit Produk Sukses'
      })

      setLoading(false)
      setProducts(prev => {
        const products = prev.map(product => {
          if (product.idProduct == productEdit.idProduct) {
            return productEdit
          }
          return product
        })
        return products
      })
      setProductEdit(null)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <>
      <header>
        <NavbarProfile title="Produk Saya" />
      </header>
      <main className="w-full mt-8 px-6 sm:pl-12 md:pl-72 py-2 pb-10 transition-transform">
        <Aside>
          <Menus menus={menusAsideDashboard} />
        </Aside>
        {!productEdit ? (
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
            <TableProduct value={search} datas={products} setProductEdit={setProductEdit} />
          </section>
        ) : (
          <section>
            <FormProduct
              values={productEdit}
              setValues={setProductEdit}
              editorProductRef={editorRef}
              defaultDescription={productEdit.description || ""}
              setProductEdit={setProductEdit}
              handleChangeInput={handleChangeInput}
              handleImgProduct={handleImgProduct}
              saveImg={setFile}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </section>
        )}
      </main>
    </>
  )
}

export default DashboardProductsFeature