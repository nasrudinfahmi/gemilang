import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

function ProtectedRoute2() {
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

  return isSeller ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute2;
