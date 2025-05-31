import { menuItems } from "./constants";
import SideBarItem from "./sideBarItem.tsx/sideBarItem";

const SideBar = () => {
  return (
    <nav className="md:flex flex-col w-52 px-4 py-7 gap-3 hidden border-r  border-[#4a4a4a] ">
      {menuItems.map((item) => (
        <SideBarItem key={item.title} item={item} />
      ))}
    </nav>
  );
};

export default SideBar;
