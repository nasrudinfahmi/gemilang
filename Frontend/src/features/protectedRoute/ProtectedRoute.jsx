import { useEffect, useState } from "react"
import { auth } from "../../lib/firebase/init"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  const user = auth.currentUser

  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(!!user)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLogin(!!user);
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <h1>loading ...</h1>

  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute