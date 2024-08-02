import PropTypes from 'prop-types'
import parse from 'html-react-parser';
import { generateRandomId, IDRformatter } from '../../../utils/utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { getCartProduct, readData, setData } from '../../../services/firestore';
import { auth } from '../../../lib/firebase/init';
import { Toast } from '../../../lib/sweetalert2/init';

function HeroSect({ product }) {
  const { user, setUser } = useContext(UserContext)
  const [existCart, setExistCart] = useState()

  useEffect(() => {
    (async function fetchUser() {
      try {
        if (!user) {
          const response = await readData("user", auth.currentUser.uid);
          setUser(response);
        }

        const responseExistCart = await getCartProduct({
          idProduct: product.idProduct,
          idUser: auth.currentUser.uid
        })

        setExistCart(responseExistCart)
      } catch (error) {
        return null
      }
    })()
  }, [user, setUser, product.idProduct])

  const handleAddToCart = async () => {
    try {
      Toast.fire({
        icon: 'info',
        title: 'Loading ...'
      })

      const idCart = existCart ? existCart.idCart : generateRandomId()

      const cart = {
        idCart,
        idProduct: product.idProduct,
        idUser: auth.currentUser.uid,
        user,
        product,
        quantity: existCart ? Number(existCart.quantity) + 1 : 1,
        createdAt: existCart ? existCart.createdAt : new Date(),
        updatedAt: new Date(),
      }

      console.log(cart)
      await setData(`carts/${idCart}`, cart)

      Toast.fire({
        icon: 'success',
        title: 'Produk Berhasil diTambahkan ke Keranjang'
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="grid padding-inline space-y-8 lg:grid-cols-2 lg:gap-9 py-4">
      <div className="space-y-3 *:select-none">
        <div>
          <img
            src={product.thumbnailProduct}
            alt="thumbnail produk"
            width={1000}
            height={400}
            className='object-cover object-center' />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product?.imgs?.length > 0 && (
            <img src={product.thumbnailProduct} alt='thumbnail produk' width={300} height={300} className='object-cover object-center' />
          )}
          {product?.imgs?.length > 0 && product.imgs.map((img, i) => (
            <img key={i} src={img} alt={`gambar ${i + 1}`} width={300} height={300} className='object-cover object-center' />
          ))}
        </div>
      </div>

      <article>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-950">{product.productName}</h1>
        <h2 className="text-2xl mt-3">{IDRformatter(product.price)}</h2>

        <div className="mt-5 space-x-4 *:w-1/4">
          <button type="button" className="border rounded-md py-1.5 bg-emerald-100 hover:bg-emerald-200" onClick={handleAddToCart}>Keranjang</button>
          <button type="button" className="border rounded-md py-1.5 bg-teal-200 hover:bg-teal-300">Beli</button>
        </div>

        <div className="text-slate-800 mt-5">
          <h2 className="text-xl mb-4 font-medium">Deskripsi</h2>
          <div className='description-wrapper'>
            {product.description ? parse(product.description) : '-'}
          </div>
        </div>
      </article>
    </section>
  )
}

HeroSect.propTypes = {
  product: PropTypes.object.isRequired,
}

export default HeroSect