import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' Component={HomePage} />
      <Route path='auth'>
        <Route path='login' Component={LoginPage} />
        <Route path='register' Component={RegisterPage} />
      </Route>
    </>
  )
)

export default router