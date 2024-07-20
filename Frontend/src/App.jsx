import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { AuthProvider } from "./features/authentication/context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AsideProvider } from "./context/AsideContext"
import { PhotoProfileProvider } from "./context/PhotoProfileContext"
import { SellerProvider } from "./context/SellerContext"
import { UserProvider } from "./context/UserContext"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <AsideProvider>
            <PhotoProfileProvider>
              <SellerProvider>
                <RouterProvider router={router} />
              </SellerProvider>
            </PhotoProfileProvider>
          </AsideProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App