import { Link } from "react-router-dom"
import { heroBanner } from "../../../assets"

function HeroBanner() {
  return (
    <section className="mt-4 w-full padding-inline">
      <Link>
        <img
          src={heroBanner.banner1}
          alt="banner 1"
          width={1000}
          height={500}
          className="w-full h-max object-center"
        />
      </Link>
    </section>
  )
}

export default HeroBanner