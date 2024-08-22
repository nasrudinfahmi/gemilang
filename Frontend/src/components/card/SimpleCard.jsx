import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IDRformatter } from '../../utils/utils'

function SimpleCard({ to, image, alt, width, height, className, productName, price }) {
  const w = width ? width : 400
  const h = height ? height : 70

  return (
    <Link to={`/product/${to}`} className={`rounded-xl bg-white block ${className}`}>
      <img
        src={image}
        alt={alt}
        width={w}
        height={h}
        className="rounded-xl object-cover object-center w-full"
      />
      <span className="flex flex-col gap-1 mt-3">
        <h3 className="px-1 font-medium text-slate-500">{productName}</h3>
        <p className="px-1 text-lg font-semibold">{IDRformatter(price)}</p>
      </span>
    </Link>
  )
}

SimpleCard.propTypes = {
  to: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
}

export default SimpleCard
