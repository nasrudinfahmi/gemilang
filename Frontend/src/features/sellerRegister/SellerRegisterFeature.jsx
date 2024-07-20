import NavbarProfile from "../../components/navbar/NavbarProfile";
import Aside from "../../components/aside/asideProfile/AsideProfile";
import SellerRegister from "../../components/seller/sellerRegister";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../lib/firebase/init";
import { Toast } from "../../lib/sweetalert2/init";
import Menus from "../../components/aside/asideProfile/Menus";
import { menusAsideProfile } from "../../constants/constant";
import { readData } from "../../services/firestore";

function SellerRegisterFeature() {
  const currentUser = auth.currentUser
  const [user, setUser] = useState()
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async function fetch() {
      try {
        const userResponse = await readData('user', currentUser.uid)
        setUser(userResponse)

        const seller = user?.role === 'seller' && userResponse?.idSeller;
        setIsSeller(seller);
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [currentUser, user]);

  if (loading) return <h1>Loading ...</h1>;

  if (!user && currentUser && !loading && !isSeller) {
    Toast.fire({
      icon: "info",
      title: "Lengkapi Data Terlebih Dahulu!"
    })
    return <Navigate to="/profile/me" />
  }

  return isSeller ? <Navigate to="/" /> : (
    <>
      <header>
        <NavbarProfile title="Mulai Jualan" />
      </header>
      <main className="pb-10">
        <Aside>
          <Menus menus={menusAsideProfile} />
        </Aside>
        <SellerRegister />
      </main>
    </>
  )
}

export default SellerRegisterFeature