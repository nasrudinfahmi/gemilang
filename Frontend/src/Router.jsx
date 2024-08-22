import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
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
import DetailProductPage from './pages/DetailProductPage'
import NotfoundPage from './pages/NotfoundPage'
import CartPage from './pages/CartPage'
import Notif from './services/Notif'
import ProductsListPage from './pages/ProductsListPage'
import { fetchProducts } from './services/firestore'
import LoadingUi from './layouts/LoadingUi'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='*' Component={NotfoundPage} />
      <Route path='/' Component={HomePage} loader={fetchProducts} />
      <Route path='auth' element={<Navigate to="/auth/login" replace />} />
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
      <Route path='product/:idProduct' Component={DetailProductPage} />
      <Route Component={ProtectedRoute}>
        <Route path='cart' Component={CartPage} />
      </Route>
      <Route path='products' Component={ProductsListPage} />
      <Route Component={ProtectedRoute}>
        <Route path='/notif' Component={Notif} />
      </Route>
      <Route path='/loading' Component={LoadingUi} />
    </>
  )
)

export default router