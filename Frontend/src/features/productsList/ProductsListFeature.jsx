import { useSearchParams } from "react-router-dom"
import Navbar from "../../components/navbar/NavbarSearch"
import CardProduct from "../../components/card/CardProduct"
import { useCallback, useEffect, useState } from "react"
import { getProductsByName } from "../../services/firestore"

function ProductsListFeature() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    try {
      const key = searchParams.get("search")?.trim();

      if (!key) {
        setProducts([]);
        return;
      }

      setLoading(true)
      const fetchedProducts = await getProductsByName(key);
      setProducts(fetchedProducts);
    } catch (error) {
      console.log("Error get products." + error.message);
    } finally {
      setLoading(false)
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div className="w-full min-h-screen bg-zinc-50/50">
      <header className="bg-white">
        <Navbar withNavBottom={false} withBackLink />
      </header>

      <main className="padding-inline pt-3">
        {searchParams.get("search") && (
          <h1 className="text-xl mb-7 lg:text-3xl lg:mb-10 leading-tight">{loading ? "Loading ..." : searchParams.get("search")?.trim()}</h1>
        )}

        {!loading && (
          <section className={`grid ${products.length !== 0 ? "pb-9 grid-cols-2 gap-2 min-[600px]:grid-cols-3 min-[600px]:gap-4 lg:grid-cols-4 2xl:grid-cols-5" : "place-content-center min-h-[80vh]"}`}>
            {products.length !== 0 && !loading ? products.map((product, i) => (
              <CardProduct
                key={i}
                productName={product.productName}
                img={product.thumbnailProduct}
                price={product.price}
                to={product.id}
                desc={product.description}
              />
            )) : (
              <h1 className="text-xl md:text-3xl">404 | Produk tidak ditemukan</h1>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default ProductsListFeature