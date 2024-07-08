import { useState } from "react"
import FormAuth from "./FormAuth/FormAuth"
import { useAuth } from "./hooks/authHooks"
import { login } from "./services/authentication"
import { Toast } from "../../lib/sweetalert2/init"
import { useNavigate } from "react-router-dom"

function LoginFeatures() {
  const { email, password } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const user = await login(email, password)
      setLoading(false)
      console.log(user)
      setError("")

      Toast.fire({
        icon: "success",
        title: "Login Berhasil"
      });

      navigate('/', { replace: true })
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <main>
      <FormAuth
        title="Login"
        onSubmit={onSubmit}
        loading={loading}
        errMsg={error}
      />
    </main>
  )
}

export default LoginFeatures