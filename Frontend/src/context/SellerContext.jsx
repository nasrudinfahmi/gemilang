import PropTypes from 'prop-types'
import { createContext, useContext, useState } from "react";

const SellerContext = createContext()

function SellerProvider({ children }) {
  const [seller, setSeller] = useState()

  return (
    <SellerContext.Provider value={{ seller, setSeller }}>
      {children}
    </SellerContext.Provider>
  )
}

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

const useSeller = () => {
  const { seller, setSeller } = useContext(SellerContext)
  return { seller, setSeller }
}

export { SellerContext, SellerProvider, useSeller }