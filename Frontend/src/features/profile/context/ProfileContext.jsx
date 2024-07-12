import PropTypes from 'prop-types'
import { createContext, useState } from "react";

const ProfileContext = createContext()

function ProfileProvider({ children }) {
  const [asideProfileActive, setAsideProfileActive] = useState(true)

  return (
    <ProfileContext.Provider value={{ asideProfileActive, setAsideProfileActive }}>
      {children}
    </ProfileContext.Provider>
  )
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ProfileProvider, ProfileContext }