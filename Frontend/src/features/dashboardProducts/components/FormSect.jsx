import { useState } from "react"
import Input1 from "../../../components/input/InputField"

function FormSect() {
  const [product, setProduct] = useState({})

  const onChange = e => {
    const key = e.target.name

    setProduct(prev => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  return (
    <section>
      <form>
        <Input1
          id="product"
          name="productName"
          label="Nama Produk"
          value={product.productName}
          onChange={onChange}
        />
      </form>
    </section>
  )
}

export default FormSect