import PropTypes from 'prop-types'
import { icons } from "../../assets"
import useResizeWindow from "../../hooks/useResizeWindow"
import { useToggleAside } from '../../hooks/asideHooks'
import { usePhotoProfile } from '../../hooks/usePhotoProfile'
import { auth } from '../../lib/firebase/init'

function NavbarProfile({ title, icon }) {
  const { windowWidth } = useResizeWindow()
  const { setAsideProfileActive } = useToggleAside()
  const { photoPofileUrl } = usePhotoProfile()

  const photoProfile =
    icon || photoPofileUrl || auth.currentUser?.photoURL || icons.defaultAvatar

  const openSidebar = () => {
    setAsideProfileActive(false)
  }

  return (
    <>
      <nav className="px-6 sm:pl-12 md:pl-72 flex justify-between items-center py-2 border transition-transform">
        <div className="flex items-center gap-5">
          {windowWidth < 768 && (
            <button onClick={openSidebar}>
              <img src={icons.collapse} alt="buka sidebar" width={21} height={21} className="rotate-180" />
            </button>
          )}
          <h1 className="text-2xl lg:text-3xl">{title}</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button type="button" aria-label="Notifikasi" title="Notifikasi">
            <img src={icons.notification} alt="Notifikasi ikon" width={24} height={24} />
          </button>
          <button type="button" aria-label="Pesanan Saya" title="Pesanan Saya">
            <img src={icons.chat} alt="chat ikon" width={24} height={24} />
          </button>
          <button type="button" aria-label="Profil Saya" title="Profil Saya">
            <img
              width={24}
              height={24}
              alt="Photo Profile"
              src={photoProfile}
            />
          </button>
        </div>
      </nav>
    </>
  )
}

NavbarProfile.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

export default NavbarProfile