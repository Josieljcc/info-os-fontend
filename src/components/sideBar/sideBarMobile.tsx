import { useState } from "react";
import { menuItems } from "./constants";

import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import SideBarItem from "./sideBarItem.tsx/sideBarItem";

const SideBarMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex md:hidden z-50 absolute right-0 bg-zinc-800 rounded-lg h-screen ">
      <ButtonPrimary
        onClick={handleIsOpen}
        className="h-8 w-8 absolute right-3 top-3"
      >
        {isOpen ? <IoCloseSharp /> : <IoIosMenu />}
      </ButtonPrimary>
      {!isOpen || (
        <nav className="flex flex-col w-52 px-4 py-14 gap-3 h-full ">
          {menuItems.map((item) => (
            <SideBarItem key={item.title} item={item} />
          ))}
        </nav>
      )}
    </div>
  );
};

export default SideBarMobile;
