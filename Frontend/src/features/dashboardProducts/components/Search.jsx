import PropTypes from 'prop-types'
import { icons } from "../../../assets"

function Search({ value, handleSearch }) {
  return (
    <div className="flex border w-full sm:w-2/3 xl:w-2/5 rounded-md overflow-hidden">
      <input
        value={value}
        onChange={handleSearch}
        type="text"
        id="SearchProduct"
        aria-label="Cari Produk"
        title="Cari Produk"
        name="cariProduk"
        autoComplete="off"
        spellCheck={false}
        placeholder="Cari Produk ..."
        className="w-full rounded-l-md outline-none py-1 px-2 text-lg"
      />
      <button aria-label="button search" type="button" className="rounded-r-md py-1 px-3 bg-slate-100 hover:bg-slate-200 focus:bg-slate-200">
        <img src={icons.search} alt="pencarian" width={24} height={24} />
      </button>
    </div>
  )
}

Search.propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
}

export default Search