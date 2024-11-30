import { ReactNode } from "react";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
  className?: string;
}

function ButtonPrimary({
  children,
  color = "bg-sky-700",
  className,
  ...props
}: Readonly<ButtonPrimaryProps>) {
  return (
    <button
      {...props}
      className={`${color} disabled:bg-zinc-600 transition-all duration-200 rounded-lg p-2 text-white font-bold flex items-center justify-center shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
