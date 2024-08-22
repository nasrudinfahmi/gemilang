import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { IDRformatter } from '../../utils/utils'
import parser from 'html-react-parser'

function CardProduct({ to, productName, price, desc, img }) {
  return (
    <Link to={`/product/${to}`} className="border bg-white border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow">
      <img
        src={img}
        alt={productName}
        width={400}
        height={70}
        className="w-full object-center object-cover"
      />
      <span className="flex flex-col gap-1 p-2">
        <h3 className="font-medium text-slate-600 line-clamp-2 leading-tight">{productName}</h3>
        <div id='card-desc' className="line-clamp-2 leading-tight text-slate-600 my-1 *:text-base font-normal">{parser(desc)}</div>
        <p className="px-1 text-lg font-semibold text-slate-800">{IDRformatter(price)}</p>
      </span>
    </Link>
  )
}

CardProduct.propTypes = {
  to: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  desc: PropTypes.string,
  img: PropTypes.string.isRequired,
}

export default CardProduct