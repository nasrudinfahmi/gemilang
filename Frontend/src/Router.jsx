import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './features/protectedRoute/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import SellerRegister from './features/sellerRegister/SellerRegisterFeature'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute2 from './features/protectedRoute/ProtectedRoute2'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' Component={HomePage} />
      <Route path='auth'>
        <Route path='login' Component={LoginPage} />
        <Route path='register' Component={RegisterPage} />
      </Route>
      <Route Component={ProtectedRoute} path='profile'>
        <Route path='me' Component={ProfilePage} />
        <Route path='seller' Component={SellerRegister} />
      </Route>
      <Route Component={ProtectedRoute}>
        <Route Component={ProtectedRoute2}>
          <Route path='dashboard' Component={DashboardPage} />
        </Route>
      </Route>
    </>
  )
)

export default router