import { Link, useLocation } from "react-router-dom"
import { SideBarItemType } from "../types"
import { menuItems } from "../constants"
import clsx from "clsx"

type SideBarProps = {
    item: SideBarItemType
}

const SideBarItem = ({ item }: SideBarProps) => {
    const { pathname } = useLocation()

    const selectedItem = menuItems.find((item) => item.path === pathname)

    return (
        <Link
            to={item.path}
            className={clsx('p-4 rounded-lg text-center flex items-center gap-1', {
                'bg-zinc-500': selectedItem?.title === item.title,
            })}>
            {<item.icon />}
            {item.title}
        </Link>
    )
}

export default SideBarItem