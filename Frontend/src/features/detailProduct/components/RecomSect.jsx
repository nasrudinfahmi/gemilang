import { useParams } from "react-router-dom"
import SimpleCard from "../../../components/card/SimpleCard"

function RecomSect() {
  const { idProduct } = useParams()

  return (
    <section className="padding-inline pb-10">
      <h2 className="title2 mb-6 mt-16">Produk serupa</h2>
      <div className="grid gap-x-3 gap-y-5 sm:gap-4 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {Array.from({ length: 10 }).map((_, i) => (
          <SimpleCard
            key={i}
            to={idProduct}
            productName={`produk ${i + 1}`}
            alt={`produk ${i + 1}`}
            price={19000}
            image="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
          />
        ))}
      </div>
    </section>
  )
}

export default RecomSect