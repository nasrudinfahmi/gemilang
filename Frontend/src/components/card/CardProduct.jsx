import { Link } from "react-router-dom"

function CardProduct() {
  return (
    <Link className="border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow">
      <img
        src="https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg"
        alt="gambar"
        width={400}
        height={70}
        className="w-full object-center object-cover"
      />
      <span className="flex flex-col gap-1 p-2">
        <h3 className="font-medium text-slate-600 line-clamp-2 leading-tight">Tempat Pensil</h3>
        <p className="line-clamp-2 leading-tight text-slate-600 my-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod animi non aliquam odit distinctio quasi facilis.</p>
        <p className="px-1 text-lg font-semibold text-slate-800">Rp 77.000</p>
      </span>
    </Link>
  )
}

export default CardProduct