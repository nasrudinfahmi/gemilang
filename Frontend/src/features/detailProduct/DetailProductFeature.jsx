import { useParams } from "react-router-dom"
import HeroSect from "./components/HeroSect"
import Navbar from "./components/Navbar"
import RecomSect from "./components/RecomSect"
import { useEffect, useState } from "react"
import { readData } from "../../services/firestore"
import NotfoundPage from "../../pages/NotfoundPage"

function DetailProductFeature() {
  const { idProduct } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async function () {
      try {
        const resProduct = await readData('products', idProduct)
        setProduct(resProduct)
        setLoading(false)
      } catch (error) {
        setProduct(null)
        setLoading(false)
      }
    })()
  }, [idProduct])

  if (!loading && !product) return <NotfoundPage />
  return loading ? <h1>Loading ...</h1> :
    (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <HeroSect product={product} />
          <RecomSect />
        </main>
      </>
    )
}

export default DetailProductFeature