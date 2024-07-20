import Aside from "../../components/aside/asideProfile/AsideProfile"
import Menus from "../../components/aside/asideProfile/Menus"
import NavbarProfile from "../../components/navbar/NavbarProfile"
import FormSection from "../../components/profilesSection/FormSection"
import { menusAsideProfile } from "../../constants/constant"

function ProfileFeature() {
  return (
    <>
      <header>
        <NavbarProfile title="Profil Saya" />
      </header>
      <main className="pb-10">
        <Aside>
          <Menus menus={menusAsideProfile} />
        </Aside>
        <FormSection />
      </main>
    </>
  )
}

export default ProfileFeature