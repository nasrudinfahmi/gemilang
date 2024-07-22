import PropTypes from 'prop-types'
import parse from 'html-react-parser';
import { IDRformatter } from '../../../utils/utils';

function HeroSect({ product }) {
  return (
    <section className="grid padding-inline space-y-8 lg:grid-cols-2 lg:gap-9 py-4">
      <div className="space-y-3 *:select-none">
        <div>
          <img
            src={product.thumbnailProduct}
            alt="thumbnail produk"
            width={1000}
            height={400}
            className='object-cover object-center' />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product?.imgs?.length > 0 && (
            <img src={product.thumbnailProduct} alt='thumbnail produk' width={300} height={300} className='object-cover object-center' />
          )}
          {product?.imgs?.length > 0 && product.imgs.map((img, i) => (
            <img key={i} src={img} alt={`gambar ${i + 1}`} width={300} height={300} className='object-cover object-center' />
          ))}
        </div>
      </div>

      <article>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-950">{product.productName}</h1>
        <h2 className="text-2xl mt-3">{IDRformatter(product.price)}</h2>

        <div className="mt-5 space-x-4 *:w-1/4">
          <button type="button" className="border rounded-md py-1.5 bg-emerald-100 hover:bg-emerald-200">Keranjang</button>
          <button type="button" className="border rounded-md py-1.5 bg-teal-200 hover:bg-teal-300">Beli</button>
        </div>

        <div className="text-slate-800 mt-5">
          <h2 className="text-xl mb-4 font-medium">Deskripsi</h2>
          <div className='description-wrapper'>
            {product.description ? parse(product.description) : '-'}
          </div>
        </div>
      </article>
    </section>
  )
}

HeroSect.propTypes = {
  product: PropTypes.object.isRequired,
}

export default HeroSect