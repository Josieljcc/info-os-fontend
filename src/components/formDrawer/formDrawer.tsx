import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type FormDrawerProps = {
  children: React.ReactNode;
  buttonTitle: string;
  title?: string;
  isOpen?: boolean;
};

const FormDrawer = ({ children, buttonTitle, title = "" }: FormDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="text-white">{buttonTitle}</DrawerTrigger>
      <DrawerContent className="flex justify-center">
        <DrawerHeader className="flex justify-center flex-col items-center">
          <DrawerTitle className="text-neutral-200 text-center text-4xl font-semibold pb-16">
            {title}
          </DrawerTitle>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
