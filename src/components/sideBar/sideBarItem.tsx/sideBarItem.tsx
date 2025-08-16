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
      className={clsx("p-3 rounded-2xl text-center text-sm flex items-center gap-3", {
        "bg-[#3f3f3f]": selectedItem?.title === item.title,
      })}
      viewTransition
    >
      {<item.icon className="w-5 h-5" />}
      {item.title}
    </Link>
  );
}

export default SideBarItem