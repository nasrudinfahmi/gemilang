import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { getCarts } from "../../services/firestore"
import { auth } from "../../lib/firebase/init"
import MainSect from "./components/MainSect"

function CartFeature() {
  const [loading, setLoading] = useState(true)
  const [carts, setCarts] = useState([])
  const [orderSummary, setOrderSummary] = useState({
    subtotal: "",
    discount: "",
    shipping: "",
    tax: "",
    total: "",
  })

  useEffect(() => {
    (async function fetchCarts() {
      try {
        const cartResponse = await getCarts(auth.currentUser.uid)
        setCarts(cartResponse)

        const subtotal = cartResponse.length > 1 ?
          cartResponse.reduce((acc, curr) => {
            const prod1 = Number(Number(acc.quantity) * Number(acc.product.price))
            const prod2 = Number(Number(curr.quantity) * Number(curr.product.price))

            return prod1 + prod2
          }) :
          Number(cartResponse[0]?.quantity) * Number(cartResponse[0]?.product.price)

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
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return loading ? <h1>Loading ...</h1> : (
    <>
      <header>
        <Navbar />
      </header>
      <main className={`padding-inline pb-9 ${carts.length == 0 && 'bg-stone-50'}`}>
        <MainSect
          carts={carts}
          setCarts={setCarts}
          orderSummary={orderSummary}
          setOrderSummary={setOrderSummary}
        />
      </main>
    </>
  )
}

export default CartFeature