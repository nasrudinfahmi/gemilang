import NavbarProfile from "../../components/navbar/NavbarProfile";
import Aside from "../../components/aside/asideProfile/AsideProfile";
import SellerRegister from "../../components/seller/sellerRegister";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function SellerRegisterFeature() {
  const { user, loading: userLoading } = useUser();
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userLoading) {
      const seller = user?.role === 'seller' && user?.idSeller;
      setIsSeller(seller);
    }

    if (user) setLoading(false)
  }, [user, userLoading]);

  if (userLoading || loading) return <h1>Loading ...</h1>;

  return isSeller ? <Navigate to="/" /> : (
    <>
      <header>
        <NavbarProfile title="Mulai Jualan" />
      </header>
      <main className="pb-10">
        <Aside />
        <SellerRegister />
      </main>
    </>
  )
}

export default SellerRegisterFeature