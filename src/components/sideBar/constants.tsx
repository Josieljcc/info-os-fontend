import { SideBarItemType } from "./types";
import { LiaHomeSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BsGear } from "react-icons/bs";
import { PiToolboxLight } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";

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
    icon: BsGear,
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
  {
    path: "/app/os",
    icon: HiOutlineDocumentText,
    title: "O.S.",
  },
];
