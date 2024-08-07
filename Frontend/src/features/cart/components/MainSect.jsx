import PropTypes from 'prop-types'
import CartNotfound from './CartNotfound'
import { generateRandomId, IDRformatter } from '../../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { icons } from '../../../assets'
import { deleteData, setData } from '../../../services/firestore'
import { useState } from 'react'
import { auth } from '../../../lib/firebase/init'
import { useUser } from '../../../hooks/useUser'
import useSnap from '../../../hooks/useSnap'
import { payment } from '../../../services/payment'
import { Toast } from '../../../lib/sweetalert2/init'

function MainSect({ carts, orderSummary, setCarts, setOrderSummary }) {
  const [loading, setLoading] = useState(false)
  const { user, loading: userLoading } = useUser()
  const { snap } = useSnap()
  const [processPayment, setProcessPayment] = useState(false)
  const navigate = useNavigate()

  const handleBtnQty = (e, type) => {
    setLoading(true)

    if (type !== 'dec' && type !== 'inc') return;
    if (type === 'dec' && e.quantity == 1) return;
    if (type === 'inc' && e.quantity == 99) return;

    const newCart = {
      ...e,
      quantity: type === 'inc' ? e.quantity + 1 : e.quantity - 1,
    }

    let newCarts = [...carts]
    newCarts = newCarts.map(product => {
      if (product.idCart === e.idCart) {
        return newCart
      }
      return product
    })

    setCarts(newCarts)

    const subtotal = newCarts.length > 1 ?
      newCarts.reduce((acc, curr) => {
        const prod1 = Number(Number(acc.quantity) * Number(acc.product.price))
        const prod2 = Number(Number(curr.quantity) * Number(curr.product.price))

        return prod1 + prod2
      }) :
      Number(newCarts[0]?.quantity) * Number(newCarts[0]?.product.price)

    const discount = 11000
    const shipping = 19000
    const tax = 2000

    setOrderSummary(() => ({
      subtotal,
      discount,
      shipping,
      tax,
      total: (subtotal + shipping + tax) - discount
    }))

    setTimeout(async () => {
      try {
        await setData(`carts/${newCart.idCart}`, newCart)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }, 0)
  }

  const onKeyDown = (e) => {
    const isNotAllowed =
      e.key == 'e' ||
      e.key == '-' ||
      e.key == '.' ||
      e.key == ',' ||
      e.key == '+'

    if (isNotAllowed)
      return e.preventDefault();
  }

  const onBlur = (e, cart) => {
    if (e.target.value == '') {
      e.target.value = 1

      setCarts(prev => {
        const newCarts = prev.map(product => {
          if (product.idCart === cart.idCart) {
            return {
              ...cart,
              quantity: Number(1),
            }
          }
          return product
        })

        return newCarts
      })

      setTimeout(async () => {
        try {
          setLoading(true)
          const newCart = {
            ...cart,
            quantity: Number(1)
          }

          await setData(`carts/${newCart.idCart}`, newCart)
        } catch (error) {
          console.log(error.message)
        } finally {
          setLoading(false)
        }
      }, 0)
    } else {
      if (e.target.value == cart.quantity) return;

      setTimeout(async () => {
        try {
          setLoading(true)
          const newCart = {
            ...cart,
            quantity: Number(e.target.value)
          }

          await setData(`carts/${newCart.idCart}`, newCart)
        } catch (error) {
          console.log(error.message)
        } finally {
          setLoading(false)
        }
      }, 0)
    }
  }

  const handleDeleteCart = (cart) => {
    try {
      setCarts(prev => {
        const newCarts = prev.filter(product => product.idCart !== cart.idCart)

        const subtotal = newCarts.length > 1 ?
          newCarts.reduce((acc, curr) => {
            const prod1 = Number(Number(acc.quantity) * Number(acc.product.price))
            const prod2 = Number(Number(curr.quantity) * Number(curr.product.price))

            return prod1 + prod2
          }) :
          Number(newCarts[0]?.quantity) * Number(newCarts[0]?.product.price)

        const discount = 11000
        const shipping = 19000
        const tax = 2000

        setOrderSummary(() => ({
          subtotal,
          discount,
          shipping,
          tax,
          total: (subtotal + shipping + tax) - discount
        }))

        setTimeout(async () => {
          try {
            setLoading(true)
            await deleteData(`carts/${cart.idCart}`)
          } catch (error) {
            console.log(error.message)
          } finally {
            setLoading(false)
          }
        }, 0)

        return newCarts
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e, cart) => {
    if (e.target.value > 99) return 99

    setCarts(prev => {
      const newCarts = prev.map(product => {
        if (product.idCart === cart.idCart) {
          return {
            ...cart,
            quantity: Number(e.target.value) || "",
          }
        }
        return product
      })

      const subtotal = newCarts.length > 1 ?
        newCarts.reduce((acc, curr) => {
          const prod1 = Number(Number(acc.quantity) * Number(acc.product.price))
          const prod2 = Number(Number(curr.quantity) * Number(curr.product.price))

          return prod1 + prod2
        }) :
        Number(newCarts[0]?.quantity) * Number(newCarts[0]?.product.price)

      const discount = 11000
      const shipping = 19000
      const tax = 2000

      setOrderSummary(() => ({
        subtotal,
        discount,
        shipping,
        tax,
        total: (subtotal + shipping + tax) - discount
      }))

      return newCarts
    })
  }

  const handleBuy = async () => {
    const idOrder = 'tsx-' + generateRandomId();
    let orders = {
      idOrder,
      idUser: auth.currentUser.uid,
      user: user,
      status: 'pending',
      grossAmount: orderSummary.total,
      paymentMethod: null,
      createdAt: new Date(),
    }

    const orderProducts = carts.map(cart => {
      return {
        idProduct: cart.idProduct,
        quantity: cart.quantity,
        product: cart.product,
      }
    })

    orders.products = orderProducts

    try {
      const paymentResponse = await payment({
        transactionDetails: {
          orderId: orders.idOrder,
          grossAmount: orders.grossAmount,
        },
        customerDetails: user,
        products: orderProducts,
        serviceFee: {
          discount: orderSummary.discount,
          shipping: orderSummary.shipping,
          tax: orderSummary.tax
        }
      })

      setProcessPayment(false) // if embedId === snap-container set to true

      if (paymentResponse.success) {
        await setData(`/orders/${idOrder}`, orders)
      }

      const snapToken = paymentResponse.trxToken.token
      snap.pay(snapToken, {
        // embedId: 'snap-container',
        onSuccess: async function (result) {
          setProcessPayment(false)

          const newDataTransaction = {
            ...orders,
            status: 'paid',
            paymentMethod: result.payment_type
          }

          await setData(`/orders/${orders.idOrder}`, newDataTransaction)
          Toast.fire({
            icon: "success",
            title: "Pembayaran Berhasil"
          })

          navigate("/notif", { replace: true })
          setCarts([])
        },
        onPending: function () {
          setProcessPayment(false)
          deleteData(`/orders/${orders.idOrder}`)
            .then(() => navigate('/cart', { replace: true }))
        },
        onError: function () {
          setProcessPayment(false)
          deleteData(`/orders/${orders.idOrder}`)
            .then(() => navigate('/cart', { replace: true }))
        },
        onClose: function () {
          setProcessPayment(false)
          deleteData(`/orders/${orders.idOrder}`)
            .then(() => navigate('/cart', { replace: true }))
        }
      });
    } catch (error) {
      console.log(error)
      setProcessPayment(false)
    }
  }

  return userLoading ? <h1>Loading ...</h1> : (
    <>
      {carts.length !== 0 ? (
        processPayment ? (
          <section>
            <div id="snap-container" className='w-full h-full sm:padding-inline'></div>
          </section>
        ) :
          <div className="padding-inline pb-9 flex flex-col lg:relative lg:flex-row lg:gap-5 xl:gap-6">
            <section className="mt-9 divide-y lg:w-3/5 lg:mt-11">
              {carts.map((cart, i) => (
                <article key={i} className="flex gap-4 pl-2 sm:pl-4 md:pl-6 lg:pl-8 pr-3 sm:pr-5 lg:pr-8 py-7 sm:py-10 odd:bg-slate-50/40 even:bg-white rounded-sm">
                  <Link to={`/product/${cart.product.idProduct}`} aria-label="lihat produk" title="Lihat Produk">
                    <img src={cart.product.thumbnailProduct} alt={cart.product.productName} width={200} height={200}
                      className="object-center object-cover aspect-square size-24 rounded-lg overflow-hidden"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between gap-3 sm:gap-5">
                      <Link to={`/product/${cart.product.idProduct}`} aria-label="lihat produk" title="Lihat Produk">
                        <h3 className="line-clamp-2 leading-tight font-medium text-slate-700">{cart.product.productName}</h3>
                      </Link>
                      <button type="button" className="shrink-0 h-max" aria-label="hapus" title="Hapus Produk" onClick={() => handleDeleteCart(cart)}>
                        <img src={icons.plus} alt="delete ikon" width={18} height={18} className="rotate-45" />
                      </button>
                    </div>
                    <p className="my-4 text-green-600 text-lg">{IDRformatter(cart.product.price * cart.quantity)}</p>
                    <div className="border flex items-center justify-center rounded-md overflow-hidden w-max">
                      <button type="button" className="px-1.5 rounded-l-md" aria-label="kurangi kuantiti" title="Kurangi Kuantiti" onClick={() => handleBtnQty(cart, "dec")} disabled={loading}>
                        <img src={icons.minus} alt="minus ikon" width={22} height={22} />
                      </button>
                      <input type="number" name="qty" id="qty" value={cart.quantity} onChange={(e) => handleChange(e, cart)} onKeyDown={onKeyDown} onBlur={(e) => onBlur(e, cart)} min={1} max={99} inputMode="numeric" className="text-center border-x outline-none" aria-label="kuantiti" title="kuantiti" pattern="[0-9]*" disabled={loading} />
                      <button type="button" className="px-1.5 rounded-r-md" aria-label="tambah kuantiti" title="Tambah Kuantiti" onClick={() => handleBtnQty(cart, "inc")} disabled={loading}>
                        <img src={icons.plus} alt="plus ikon" width={22} height={22} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className="mt-9 lg:mt-12 bg-slate-50 p-5 rounded-lg lg:h-max lg:sticky top-8 right-0 lg:w-2/5">
              <h2 className="mb-5 text-xl">Ringkasan Pembayaran</h2>
              <div className="divide-y">
                <h3 className="grid grid-cols-2 items-center py-3 gap-4">
                  <span>Subtotal ({carts.length})</span>
                  <span>{IDRformatter(orderSummary.subtotal)}</span>
                </h3>
                <h3 className="grid grid-cols-2 items-center py-3 gap-4">
                  <span>Diskon</span>
                  <span>- {IDRformatter(orderSummary.discount)}</span>
                </h3>
                <h3 className="grid grid-cols-2 items-center py-3 gap-4">
                  <span>Ongkir</span>
                  <span>{IDRformatter(orderSummary.shipping)}</span>
                </h3>
                <h3 className="grid grid-cols-2 items-center py-3 gap-4">
                  <span>Biaya Pelayanan</span>
                  <span>{IDRformatter(orderSummary.tax)}</span>
                </h3>
                <h3 className="grid grid-cols-2 items-center py-3 gap-4 *:text-lg">
                  <span>Total</span>
                  <span>{IDRformatter(orderSummary.total)}</span>
                </h3>

                <button
                  type="button"
                  title={`Bayar ${IDRformatter(orderSummary.total)}`}
                  className="py-1.5 rounded-md w-full border-none bg-blue-600 text-white text-lg hover:bg-blue-700 mt-2"
                  onClick={handleBuy}
                  disabled={loading}>Bayar ({carts.length})
                </button>
              </div>
            </section>
          </div>
      ) : (
        <CartNotfound />
      )}
    </>
  )
}

MainSect.propTypes = {
  carts: PropTypes.array.isRequired,
  setCarts: PropTypes.func.isRequired,
  orderSummary: PropTypes.object.isRequired,
  setOrderSummary: PropTypes.func.isRequired,
}

export default MainSect
