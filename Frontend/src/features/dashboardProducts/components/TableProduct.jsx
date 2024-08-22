import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { deleteFile, deleteFiles } from '../../../services/storage';
import { getFileNameFromUrl } from '../../../utils/utils';
import { deleteCartsByIdProduct, deleteData } from '../../../services/firestore';
import { confirmToast } from '../../../lib/sweetalert2/init';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function TableProduct({ value, datas, setProductEdit }) {
  const [data, setData] = useState(datas)

  useEffect(() => {
    if (value) {
      setData(() => {
        return datas.filter(data => data.productName.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()))
      })
    } else {
      setData(datas)
    }
  }, [value, datas])

  const handleDelete = async product => {
    try {
      const { isConfirmed } = await Swal.fire(confirmToast({
        title: "Yakin Ingin Menghapus Produk?",
        text: "Data Produk Tidak Bisa Dipulihkan!",
        confText: "Hapus",
        cancelText: "Batal",
      }))

      if (!isConfirmed) return;

      const thumbnailProduct = product.thumbnailProduct
      const thumbnailName = getFileNameFromUrl(thumbnailProduct)?.split("/")[1]
      const imgs = product.imgs

      const deletedPromises = [
        deleteFile("products", thumbnailName),
        deleteFiles("products", imgs),
        deleteData(`products/${product.idProduct}`),
        deleteCartsByIdProduct(product.idProduct)
      ]

      await Promise.all(deletedPromises)

      setData(prev => {
        const newDatas = prev.filter(data => data.idProduct !== product.idProduct)
        return newDatas
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="overflow-x-auto mt-9 rounded-md">
      <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="divide-x">
            <th className="py-2 px-4 border-b">Produk</th>
            <th className="py-2 px-4 border-b">Merek</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Stok</th>
            <th className="py-2 px-4 border-b">Pengiriman</th>
            <th className="py-2 px-4 border-b">Thumbnail</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, i) => (
            <tr key={i} className="hover:bg-slate-50 even:bg-stone-50">
              <td className="py-2 px-4 border-b leading-tight">{product.productName}</td>
              <td className="py-2 px-4 border-b leading-tight">{product.brand}</td>
              <td className="py-2 px-4 border-b leading-tight">{product.status}</td>
              <td className="py-2 px-4 border-b leading-tight">{product.stock}</td>
              <td className="py-2 px-4 border-b leading-tight">{product.delivery}</td>
              <td className="py-2 px-4 border-b">
                <div className='flex justify-center items-center'>
                  <img src={product.thumbnailProduct} alt={`Gambar ${i + 1}`} width={64} height={64} />
                </div>
              </td>
              <td className="py-2 px-4 border-b ">
                <div className='flex justify-evenly items-center gap-2'>
                  <Link to={`/product/${product.idProduct}`} type="button" title="Lihat" className='px-3 py-1 rounded-md bg-green-300 hover:bg-green-500'>Lihat</Link>
                  <button type="button" title="Edit" className='px-3 py-1 rounded-md bg-orange-300 hover:bg-orange-500' onClick={() => setProductEdit(product)}>Edit</button>
                  <button type="button" title="Hapus" className='px-3 py-1 rounded-md bg-red-400 hover:bg-red-600' onClick={() => handleDelete(product)}>Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

TableProduct.propTypes = {
  value: PropTypes.string,
  datas: PropTypes.array,
  setProductEdit: PropTypes.func,
}

export default TableProduct