import { useEffect, useMemo, useState } from "react"
import { useUser } from "../hooks/useUser"
import { deleteCarts } from "./firestore"
import { Navigate, useSearchParams } from "react-router-dom"
import LoadingUi from "../layouts/LoadingUi"

function Notif() {
  const { user, loading: loadingUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const query = useMemo(() => {
    return {
      statusCode: searchParams.get("status_code"),
      transactionStatus: searchParams.get("transaction_status"),
    }
  }, [searchParams])

  useEffect(() => {
    if (searchParams.size === 3) {
      if (query.statusCode === 200 && query.transactionStatus === 'settlement') {
        (async function fetch() {
          await deleteCarts(user.idUser)
        })()
      }
      setLoading(false)
    }

  }, [user, query, searchParams])

  return loading && loadingUser ?
    <LoadingUi /> :
    <Navigate to="/cart" replace />
}

export default Notif