import PropTypes from 'prop-types'
import { createContext, useState } from "react";

const AsideContext = createContext()

function AsideProvider({ children }) {
  const [asideProfileActive, setAsideProfileActive] = useState(true)

  return (
    <AsideContext.Provider value={{ asideProfileActive, setAsideProfileActive }}>
      {children}
    </AsideContext.Provider>
  )
}

AsideProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AsideProvider, AsideContext }