import { Editor } from "@tinymce/tinymce-react";
import { useContext, useRef, useState } from "react"
import Select from 'react-select'
import Input1 from "../../../components/input/InputField"
import { confirmToast, Toast } from "../../../lib/sweetalert2/init";
import Swal from "sweetalert2";
import { SellerContext } from "../../../context/SellerContext";
import { generateRandomId } from "../../../utils/utils";
import { setData } from "../../../services/firestore";
import { uploadFile } from "../../../services/storage";
import { useNavigate } from "react-router-dom";

function FormAddProduct() {
  const editor = 'yra55kp9qgg0gpllq8rxbgmb5iwxnxv34c1axq49finj4xfv'
  const [values, setValues] = useState({ status: 'Ready' })
  const editorRef = useRef(null);
  const { seller } = useContext(SellerContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const key = e.target.name

    setValues(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const logDescription = () => {
    if (editorRef.current) {
      const description = editorRef.current.getContent()
      return description;
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { isConfirmed } = await Swal.fire(confirmToast({
        title: "Apakah Data Sudah Benar?",
        confText: "Ya, Benar",
        cancelText: "Cek Lagi",
      }))

      if (!isConfirmed) return;
      setLoading(true)

      const idProduct = generateRandomId()

      const thumbnailExt = values.thumbnailProduct[0].type.split('image/')[1]
      const thumbnailName = `${idProduct}.${thumbnailExt}`

      const thumbnailUrl = await uploadFile(`products/${thumbnailName}`, values.thumbnailProduct[0])

      const imgs = values.imgs ? Array.from(values.imgs) : null
      let imgsUrl = []

      if (imgs && imgs.length > 0) {
        for (let i = 0; i < imgs.length; i++) {
          const imgExt = imgs[i].type.split('image/')[1]
          const imgName = generateRandomId() + `.${imgExt}`
          const imgUrl = await uploadFile(`products/${imgName}`, imgs[i])
          imgsUrl.push(imgUrl)
        }
      }

      const datas = {
        ...values,
        seller,
        idProduct,
        description: logDescription(),
      }

      datas.thumbnailProduct = thumbnailUrl
      datas.imgs = imgsUrl

      await setData(`products/${idProduct}`, datas)
      setLoading(false)

      Toast.fire({
        icon: 'success',
        title: 'Sukses Menambahkan Produk',
      })

      navigate('/dashboard/products')
    } catch (error) {
      setLoading(false)
      Toast.fire({
        icon: 'error',
        title: 'Gagal Menambahkan Produk!',
      })
    }
  }

  const handleImgProduct = e => {
    const key = e.target.name

    setValues(prev => ({
      ...prev,
      [key]: e.target.files
    }))
  }

  return (
    <section>
      <form className="flex flex-col gap-4 lg:gap-5" onSubmit={handleSubmit}>
        <Input1
          id="productName"
          name="productName"
          label="Nama Produk"
          title="Nama Produk"
          value={values.productName}
          onChange={handleChange}
          required
        />
        <Input1
          id="price"
          type="number"
          name="price"
          label="Harga"
          title="Harga Produk"
          value={values.price}
          onChange={handleChange}
          required
        />
        <Input1
          id="category"
          name="category"
          label="Kategori"
          title="Kategori Produk"
          value={values.category}
          onChange={handleChange}
          required
        />
        <label htmlFor="thumbnailProduct" className="flex flex-col gap-1">
          <span>Thumbnail Produk</span>
          <input type="file"
            name="thumbnailProduct"
            id="thumbnailProduct"
            title="Thumbnail Product"
            aria-label="Thumbnail Product"
            className="border outline-none py-1.5 px-3 rounded-md sm:text-lg"
            multiple={false}
            accept="image/*"
            onChange={handleImgProduct}
            required
          />
        </label>
        <label htmlFor="thumbnailProduct" className="flex flex-col gap-1">
          <span>Gambar Produk</span>
          <input type="file"
            name="imgs"
            id="imgs"
            title="Gambar Produk"
            aria-label="Gambar Produk"
            className="border outline-none py-1.5 px-3 rounded-md sm:text-lg"
            multiple
            accept="image/*"
            onChange={handleImgProduct}
          />
        </label>
        <Input1
          id="brand"
          name="brand"
          label="Merek"
          title="Merek"
          value={values.brand}
          onChange={handleChange}
          required
        />

        <label htmlFor="status" className="flex flex-col gap-1" title="status">
          <span>Status</span>
          <Select
            inputId="status"
            required
            name="status"
            defaultValue={{ value: 'ready', label: 'Ready' }}
            options={[
              { value: 'ready', label: 'Ready' },
              { value: 'preorder', label: 'Preorder' }
            ]}
            onChange={e => {
              setValues(prev => ({
                ...prev,
                status: e.label,
              }))
            }}
            styles={{
              control: (state) => ({
                ...state,
                borderRadius: "6px"
              })
            }}
          />
        </label>
        {values.status === 'Ready' && (
          <Input1
            id="stock"
            type="number"
            min={1}
            max={999}
            maxLength={3}
            name="stock"
            label="Stok"
            title="Stok"
            value={values.stock}
            onChange={handleChange}
            required
          />
        )}
        <Input1
          id="delivery"
          name="delivery"
          label="Pengiriman"
          title="Pengiriman"
          value={values.delivery}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-1">
          <span className="inline-block pl-0.5">Deskripsi</span>
          <Editor
            apiKey={editor}
            onInit={(_evt, editor) => editorRef.current = editor}
            init={{
              menubar: 'edit format',
              plugins: 'codesample lists searchreplace wordcount checklist casechange permanentpen powerpaste markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight | numlist bullist indent outdent | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              placeholder: "Deskripsi Produk"
            }}
          />
        </div>

        <button type="submit" aria-label="Tambah Produk" title="Tambah Produk" className={`mt-14 border py-1.5 rounded-md ${loading ? 'bg-slate-400 cursor-wait' : 'bg-slate-700 cursor-pointer'} ${loading ? 'hover:bg-slate-400' : 'hover:bg-slate-800'} text-white`}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Tambah Produk'}
        </button>
      </form>
    </section>
  )
}

export default FormAddProduct