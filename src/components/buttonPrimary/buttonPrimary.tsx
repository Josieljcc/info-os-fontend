import { ReactNode } from "react";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

function ButtonPrimary({
  children,
  color = "bg-[#71717A]",
  ...props
}: ButtonPrimaryProps) {
  return (
    <button
      {...props}
      className={`${color} w-full rounded-lg p-2 text-white font-bold flex items-center justify-center shadow-lg  transform transition-transform duration-200 hover:scale-105`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
