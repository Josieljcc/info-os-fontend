import { SideBarItemType } from "./types";
import { LiaHomeSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { PiToolboxLight } from "react-icons/pi";

export const menuItems: SideBarItemType[] = [
  {
    path: "/app",
    icon: LiaHomeSolid,
    title: "Home",
  },
  {
    path: "/app/client",
    icon: FiUser,
    title: "Cliente",
  },
  {
    path: "/app/technician",
    icon: VscTools,
    title: "Técnico",
  },
  {
    path: "/app/part",
    icon: HiMiniComputerDesktop,
    title: "Peças",
  },
  {
    path: "/app/service",
    icon: PiToolboxLight,
    title: "Serviços",

  },
  {
    path: "/app/equipment",
    icon: HiMiniComputerDesktop,
    title: "Equipamento",
  },
];
