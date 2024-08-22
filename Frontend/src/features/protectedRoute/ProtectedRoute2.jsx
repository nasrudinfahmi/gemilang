import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { readData } from "../../services/firestore";
import { auth } from "../../lib/firebase/init";
import LoadingUi from "../../layouts/LoadingUi";

function ProtectedRoute2() {
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true)
  const idUser = auth.currentUser.uid

  useEffect(() => {
    (async function fetchUser() {
      try {
        const response = await readData("user", idUser);

        const seller = response?.role === 'seller' && !!response?.idSeller;
        setIsSeller(seller);

        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [idUser]);

  if (loading) return <LoadingUi />;

  return isSeller ? <Outlet /> : <Navigate to="/profile/seller" />;
}

export default ProtectedRoute2;
