import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

function TableProduct({ value, datas }) {
  // const products = useMemo(() => datas, [datas])

  const [data, setData] = useState(datas)

  useEffect(() => {
    if (value) {
      setData(prev => {
        return prev.filter(data => data.productName.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()))
      })
    } else {
      setData(datas)
    }
  }, [value, datas])

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
                  <button type="button" title="Lihat" className='px-3 py-1 rounded-md bg-green-300 hover:bg-green-500'>Lihat</button>
                  <button type="button" title="Edit" className='px-3 py-1 rounded-md bg-orange-300 hover:bg-orange-500'>Edit</button>
                  <button type="button" title="Hapus" className='px-3 py-1 rounded-md bg-red-400 hover:bg-red-600'>Hapus</button>
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
}

export default TableProduct