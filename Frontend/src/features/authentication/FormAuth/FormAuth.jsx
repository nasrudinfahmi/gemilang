import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/authHooks'

function FormAuth({ title, onSubmit, loading, errMsg }) {
  const { pathname } = useLocation()
  const { setEmail, setPassword } = useAuth()

  return (
    <form className="w-full h-screen flex justify-center items-center" onSubmit={onSubmit}>
      <section className="flex flex-col gap-6 w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 p-4">
        <h1 className="text-center text-2xl sm:text-3xl font-bold">{title}</h1>
        <span className='text-center font-medium text-sm text-red-600 leading-tight line-clamp-2'>{errMsg}</span>
        <label htmlFor="email" className="flex flex-col">
          <span className="block mb-1.5">email</span>
          <input
            type="email"
            required
            spellCheck={false}
            aria-label="email"
            id="email"
            name="email"
            className="border outline-none px-1.5 py-1 text-lg rounded-md"
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password" className="flex flex-col">
          {pathname.includes('/login') ? (
            <div className="flex justify-between">
              <span className="block mb-1.5">password</span>
              <button type="button" aria-label="lupa password" title="lupa password" className="text-blue-600 font-semibold hover:text-blue-700">
                Lupa password?
              </button>
            </div>
          ) : (
            <span className="block mb-1.5">password</span>
          )}
          <input
            type="password"
            required
            spellCheck={false}
            aria-label="password"
            id="password"
            name="password"
            className="border outline-none px-1.5 py-1 text-lg rounded-md"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          aria-label="Login"
          title="Login"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-md py-1.5 text-lg text-white mt-2 font-medium"
        >
          {title}
        </button>
        {pathname.includes('/login') ? (
          <p className='-mt-2.5'>Belum punya akun?
            <Link to={`${loading ? "" : "/auth/register"}`} className='text-blue-600'>
              <u>Register</u>
            </Link>
          </p>
        ) : (
          <p className='-mt-2.5'>Sudah punya akun?
            <Link to={`${loading ? "" : "/auth/login"}`} className='text-blue-600'>
              <u>Login</u>
            </Link>
          </p>
        )}
      </section>
    </form>
  )
}

FormAuth.propTypes = {
  title: PropTypes.string.isRequired,
  errMsg: PropTypes.string,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default FormAuth
