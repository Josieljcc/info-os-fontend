import { Outlet } from "react-router-dom"
import SideBar from "./components/sideBar/sideBar"
import useAuthentication from "./hook/useAuthentication"

const AppLayout = () => {
    useAuthentication()

    return (
        <div className="bg-zinc-800 text-zinc-100">
            <header>header</header>
            <div className="flex">
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout