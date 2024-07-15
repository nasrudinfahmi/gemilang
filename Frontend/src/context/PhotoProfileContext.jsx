import PropTypes from 'prop-types'
import { createContext, useState } from "react";
import { auth } from '../lib/firebase/init';

const PhotoProfileContext = createContext()

function PhotoProfileProvider({ children }) {
  const photoProfile = auth?.currentUser?.photoURL
  const [photoPofileUrl, setPhotoProfileUrl] = useState(photoProfile)

  return (
    <PhotoProfileContext.Provider value={{ photoPofileUrl, setPhotoProfileUrl }}>
      {children}
    </PhotoProfileContext.Provider>
  )
}

PhotoProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { PhotoProfileContext, PhotoProfileProvider }