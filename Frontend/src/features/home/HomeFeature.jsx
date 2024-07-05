import CardProduct from "../../components/card/CardProduct"
import SimpleCard from "../../components/card/SimpleCard"
import Categories from "./categories/Categories"
import HeroBanner from "./heroBanner/HeroBanner"
import Navbar from "./navbar/Navbar"
import Section from "./section/Section"

function HomeFeature() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="pb-14">
        <HeroBanner />
        <Categories />
        <Section title="Promo">
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <SimpleCard
                key={index}
                productName="Tumbler"
                price="Rp 121.000"
                image="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                alt="Tumbler"
              />
            ))}
          </>
        </Section>
        <Section title="Produk Baru">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardProduct key={index} />
          ))}
        </Section>
        <Section title="Rekomendasi Produk">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardProduct key={index} />
          ))}
        </Section>
      </main>
    </>
  )
}

export default HomeFeature