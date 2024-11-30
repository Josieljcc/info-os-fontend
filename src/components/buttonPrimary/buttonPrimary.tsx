import { ReactNode } from "react";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

function ButtonPrimary({
  children,
  color = "bg-sky-700",
  ...props
}: Readonly<ButtonPrimaryProps>) {
  return (
    <button
      {...props}
      className={`${color} disabled:bg-zinc-600 transition-all duration-200 w-full rounded-lg p-2 text-white font-bold flex items-center justify-center shadow-lg`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
