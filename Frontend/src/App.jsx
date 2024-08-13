import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { AuthProvider } from "./features/authentication/context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AsideProvider } from "./context/AsideContext"
import { PhotoProfileProvider } from "./context/PhotoProfileContext"
import { SellerProvider } from "./context/SellerContext"
import { UserProvider } from "./context/UserContext"
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const queryClient = new QueryClient()

  return (
    <HelmetProvider>
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
    </HelmetProvider>
  )
}

export default App