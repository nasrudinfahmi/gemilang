import PropTypes from 'prop-types'
import Input1 from '../input/InputField'
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { createBlob } from '../../utils/utils'
import { Toast } from '../../lib/sweetalert2/init'

function FormProduct({ values, setValues, handleChangeInput, handleImgProduct, handleSubmit, loading, defaultDescription, editorProductRef, setProductEdit, saveImg }) {
  const editor = 'yra55kp9qgg0gpllq8rxbgmb5iwxnxv34c1axq49finj4xfv'

  const [file, setFile] = useState({ thumbnailProduct: values.thumbnailProduct, imgs: values.imgs.length ? values.imgs : null })

  const handleImg = e => {
    const key = e.target.name

    if (key == 'thumbnailProduct') {
      const blob = createBlob(e.target.files[0])
      setFile(prev => ({ ...prev, thumbnailProduct: blob }))
      handleImgProduct(e)
    } else {
      const files = Array.from(e.target.files)
      const imgUrl = []

      if (files.length > 4) {
        e.target.value = ''
        return Toast.fire({
          icon: 'error',
          title: 'Maksimal 4 Gambar!'
        })
      }

      files.forEach(file => {
        const blob = createBlob(file)
        imgUrl.push(blob)
      })

      setFile(prev => ({ ...prev, imgs: imgUrl, deleteImg: false }))
      handleImgProduct(e)
      saveImg(prev => ({ ...prev, deleteImg: true }))
    }
  }

  const deleteImg = () => {
    const imgsField = document.getElementById('imgs')
    imgsField.value = ''

    saveImg(prev => ({ ...prev, imgs: null, deleteImg: true }))
    setFile(prev => ({ ...prev, imgs: null, deleteImg: true }))
  }

  return (
    <>
      <button
        type="button"
        aria-label='Batal'
        title='Batal' onClick={() => {
          setProductEdit(null)
          saveImg(null)
        }}
        className='border shadow-sm bg-teal-400 hover:bg-teal-700 hover:text-slate-200 text-lg rounded-md px-5 py-1 mb-7'>
        Batal
      </button>
      <form className="flex flex-col gap-4 lg:gap-5" onSubmit={handleSubmit}>
        <Input1
          id="productName"
          name="productName"
          label="Nama Produk"
          title="Nama Produk"
          value={values.productName}
          onChange={handleChangeInput}
          required
        />
        <div className='flex flex-col gap-5 lg:flex-row'>
          <div>
            <img src={file.thumbnailProduct}
              alt="thumbnail product" width={120} height={120} />
          </div>
          <label htmlFor="thumbnailProduct" className="flex flex-col gap-1 flex-1">
            <span>Thumbnail Produk</span>
            <input type="file"
              name="thumbnailProduct"
              id="thumbnailProduct"
              title="Thumbnail Product"
              aria-label="Thumbnail Product"
              className="border outline-none py-1.5 px-3 rounded-md sm:text-lg"
              multiple={false}
              accept="image/*"
              onChange={handleImg}
            />
          </label>
        </div>
        <div className='flex flex-col gap-5 lg:flex-row'>
          {file.imgs && (
            <div className='grid grid-cols-4 gap-2 lg:grid-cols-2'>
              {file.imgs.map((img, i) => (
                <img key={i} src={img}
                  alt={`gambar ${i + 1}`} width={120} height={120} />
              ))}
            </div>
          )}
          <div className='flex-1 h-max flex gap-4'>
            <label htmlFor="thumbnailProduct" className="flex-1 flex flex-col gap-1">
              <span>Gambar Produk</span>
              <input type="file"
                name="imgs"
                id="imgs"
                title="Gambar Produk"
                aria-label="Gambar Produk"
                className="border outline-none py-1.5 px-3 rounded-md sm:text-lg"
                multiple
                accept="image/*"
                onChange={handleImg}
              />
            </label>
            {file.imgs && (
              <button
                type="button"
                aria-label='Hapus Gambar'
                className='border px-3 py-1.5 rounded-md flex-1 h-max self-end bg-red-400 hover:bg-red-500 text-lg'
                title='Hapus Gambar'
                onClick={deleteImg}>Hapus Gambar</button>
            )}
          </div>
        </div>
        <Input1
          id="brand"
          name="brand"
          label="Merek"
          title="Merek"
          value={values.brand}
          onChange={handleChangeInput}
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
            onChange={handleChangeInput}
            required
          />
        )}
        <Input1
          id="delivery"
          name="delivery"
          label="Pengiriman"
          title="Pengiriman"
          value={values.delivery}
          onChange={handleChangeInput}
          required
        />

        <div className="flex flex-col gap-1">
          <span className="inline-block pl-0.5">Deskripsi</span>
          <Editor
            apiKey={editor}
            onInit={(_evt, editor) => editorProductRef.current = editor}
            initialValue={defaultDescription}
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

        <button type="submit" aria-label="Ubah Produk" title="Ubah Produk" className={`mt-14 border py-1.5 rounded-md ${loading ? 'bg-slate-400 cursor-wait' : 'bg-slate-700 cursor-pointer'} ${loading ? 'hover:bg-slate-400' : 'hover:bg-slate-800'} text-white`}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Ubah Produk'}
        </button>
      </form>
    </>
  )
}

FormProduct.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  handleChangeInput: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleImgProduct: PropTypes.func,
  loading: PropTypes.bool,
  defaultDescription: PropTypes.string,
  editorProductRef: PropTypes.object,
  setProductEdit: PropTypes.func,
  saveImg: PropTypes.func,
}

export default FormProduct
