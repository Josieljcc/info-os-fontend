import { menuItems } from "./constants";
import SideBarItem from "./sideBarItem.tsx/sideBarItem";

const SideBar = () => {
  return (
    <nav className="md:flex flex-col p-10 gap-4 hidden ">
      {menuItems.map((item) => (
        <SideBarItem key={item.title} item={item} />
      ))}
    </nav>
  );
};

export default SideBar;
