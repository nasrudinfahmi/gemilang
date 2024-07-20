import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './features/protectedRoute/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute2 from './features/protectedRoute/ProtectedRoute2'
import DashboardProductsPage from './pages/DashboardProductsPage'
import AddProductPage from './pages/AddProductPage'
import SellerRegisterPage from './pages/SellerRegisterPage'

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
        <Route path='seller' Component={SellerRegisterPage} />
      </Route>
      <Route Component={ProtectedRoute}>
        <Route Component={ProtectedRoute2}>
          <Route path='dashboard' Component={DashboardPage} />
          <Route path='dashboard/products' Component={DashboardProductsPage} />
          <Route path='dashboard/products/add' Component={AddProductPage} />
        </Route>
      </Route>
    </>
  )
)

export default router