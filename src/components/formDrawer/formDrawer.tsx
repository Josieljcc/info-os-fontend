import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { IoAddOutline } from "react-icons/io5";

type FormDrawerProps = {
  children: React.ReactNode;
  buttonTitle: string;
  title?: string;
  isOpen?: boolean;
};

const FormDrawer = ({ children, buttonTitle, title = "" }: FormDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="transition-all duration-200 w-full md:w-auto bg-mainColor rounded-lg py-2 px-4 text-white font-bold flex items-center justify-center shadow-lg">
        <IoAddOutline className="h-6 w-6" /> {buttonTitle}
      </DrawerTrigger>
      <DrawerContent className="flex justify-center">
        <DrawerHeader className="flex justify-center flex-col items-center">
          <DrawerTitle className="text-neutral-200 text-center text-4xl font-semibold pb-10">
            {title}
          </DrawerTitle>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
