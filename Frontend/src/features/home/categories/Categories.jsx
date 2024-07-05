import { Link } from "react-router-dom"
import { listOfCategories } from "../../../constants/constant"

function Categories() {
  return (
    <section className="padding-inline">
      <h2 className="title2 mb-6 mt-16">Kategori</h2>
      <div className="grid max-[640px]:grid-cols-4 sm:grid-cols-6 gap-2">
        {listOfCategories.map(category => (
          <Link
            key={category.title}
            className="flex flex-col pt-2 sm:pt-4 gap-4 justify-center items-center rounded-md shadow-sm hover:shadow transition-shadow hover:outline-1 outline-slate-200"
            title={category.title}
          >
            <div className="h-10 sm:h-14">
              <img src={category.img} alt={category.title} className="w-10 h-10 sm:w-max sm:h-max object-center object-cover" width={64} height={64} />
            </div>
            <span className="text-center font-medium md:text-lg text-slate-700">{category.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories