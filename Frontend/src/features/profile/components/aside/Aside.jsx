import { Link } from "react-router-dom"
import Menus from "./Menus"
import { useToggleAside } from "../../hooks/profileHooks"
import { icons } from "../../../../assets"
import useResizeWindow from "../../../../hooks/useResizeWindow"

function Aside() {
  const { windowWidth } = useResizeWindow()
  const { asideProfileActive, setAsideProfileActive } = useToggleAside()

  const active = asideProfileActive ? "-translate-x-full md:translate-x-0" : 'translate-x-0'

  const closeSidebar = () => {
    setAsideProfileActive(true)
  }

  return (
    <aside className={`${active} flex flex-col gap-3 fixed left-0 top-0 w-60 px-4 py-6 h-screen border bg-white transition-transform`}>
      <div className="flex items-center justify-between">
        <Link to="/" className="w-max" onClick={closeSidebar}>
          <h1 className="text-2xl lg:text-3xl font-medium">Gemilang</h1>
        </Link>

        {windowWidth < 768 && (
          <button type="button" onClick={closeSidebar} aria-label="tutup sidebar" className="mt-2 border p-1.5 rounded-full border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-colors">
            <img src={icons.collapse} alt="collapse ikon" width={21} height={21} />
          </button>
        )}
      </div>

      <Menus />
    </aside>
  )
}

export default Aside