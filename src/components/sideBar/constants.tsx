import { SideBarItemType } from "./types";
import { MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";


export const menuItems: SideBarItemType[] = [
    {
        path: "/app",
        icon: MdHome,
        title: "Home",
    },
    {
        path: "/app/client",
        icon: FiUser,
        title: 'Cliente',
    },
    {
        path: "/app/technician",
        icon: VscTools,
        title: 'Técnico',
    }
]