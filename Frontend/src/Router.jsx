import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './features/protectedRoute/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'

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
      </Route>
    </>
  )
)

export default router