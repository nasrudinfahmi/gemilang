import { useLoaderData } from "react-router-dom"
import CardProduct from "../../components/card/CardProduct"
import SimpleCard from "../../components/card/SimpleCard"
import Categories from "./categories/Categories"
import HeroBanner from "./heroBanner/HeroBanner"
import Navbar from "../../components/navbar/NavbarSearch"
import ProductList from "../../components/productsList/ProductList"

function HomeFeature() {
  const products = useLoaderData()
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="pb-14">
        <HeroBanner />
        <Categories />
        <ProductList title="Promo">
          <>
            {products && products.slice(0, 11).map((product, i) => (
              product.productName !== null && (
                <SimpleCard
                  key={i}
                  to={product.idProduct}
                  productName={product.productName}
                  price={product.price}
                  image={product.thumbnailProduct}
                  alt={product.productName}
                />
              )
            ))}
          </>
        </ProductList>
        <ProductList title="Produk Baru">
          {products && products.map((product, i) => (
            product.productName !== null && (
              <CardProduct
                key={i}
                to={product.idProduct}
                productName={product.productName}
                price={product.price}
                desc={product.description}
                img={product.thumbnailProduct}
                alt={product.productName}
              />
            )
          ))}
        </ProductList>
        <ProductList title="Rekomendasi Produk">
          {products && products.map((product, i) => (
            product.productName !== null && (
              <CardProduct
                key={i}
                to={product.idProduct}
                productName={product.productName}
                price={product.price}
                desc={product.description}
                img={product.thumbnailProduct}
                alt={product.productName}
              />
            )
          ))}
        </ProductList>
      </main>
    </>
  )
}

export default HomeFeature