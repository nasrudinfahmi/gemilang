import Aside from "../../components/aside/asideProfile/AsideProfile"
import NavbarProfile from "../../components/navbar/NavbarProfile"
import FormSection from "../../components/profilesSection/FormSection"

function ProfileFeature() {
  return (
    <>
      <header>
        <NavbarProfile title="Profil Saya" />
      </header>
      <main className="pb-10">
        <Aside />
        <FormSection />
      </main>
    </>
  )
}

export default ProfileFeature