import { menuItems } from "./constants"
import SideBarItem from "./sideBarItem.tsx/sideBarItem"

const SideBar = () => {
    return (
        <nav className="flex flex-col p-10 gap-4">
            {menuItems.map((item) => <SideBarItem item={item} />)}
        </nav>
    )
}

export default SideBar