import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { AuthProvider } from "./features/authentication/context/AuthContext"
import { ProfileProvider } from "./features/profile/context/ProfileContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App