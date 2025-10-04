import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formName: string;
  Icon?: React.FC;
  className?: string;
  position?: "left-2" | "right-2";
}

const Input = ({
  Icon,
  formName,
  className,
  position = "left-2",
  ...props
}: InputProps) => {
  const { register } = useFormContext();

  return (
    <div className="relative text-[#A4A4A4]">
      <div className={`absolute top-1/2 -translate-y-1/2 ${position}`}>
        {Icon && <Icon />}
      </div>
      <input
        {...register(formName)}
        {...props}
        className={`h-10 w-full pl-8 shadow-md rounded-lg border-2 border-transparent placeholder-zinc-500 bg-[#3f3f3f] p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
