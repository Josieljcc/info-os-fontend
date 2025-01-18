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
};

const FormDrawer = ({ children, buttonTitle, title = "" }: FormDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="text-white">{buttonTitle}</DrawerTrigger>
      <DrawerContent className="flex justify-center px-[31.25rem] ">
        <DrawerHeader>
          <DrawerTitle className="text-neutral-200 text-center text-4xl font-semibold pb-24 ">
            {title}{" "}
          </DrawerTitle>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
