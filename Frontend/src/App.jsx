import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { AuthProvider } from "./features/authentication/context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AsideProvider } from "./context/AsideContext"
import { PhotoProfileProvider } from "./context/PhotoProfileContext"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AsideProvider>
          <PhotoProfileProvider>
            <RouterProvider router={router} />
          </PhotoProfileProvider>
        </AsideProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App