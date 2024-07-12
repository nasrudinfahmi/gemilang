import Aside from "./components/aside/Aside"
import FormSection from "./components/mainSection/FormSection"
import Navbar from "./components/Navbar/Navbar"

function ProfileFeature() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="pb-10">
        <Aside />
        <FormSection />
      </main>
    </>
  )
}

export default ProfileFeature