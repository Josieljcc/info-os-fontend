import Input from "../input/input";

interface InputItem {
  name: string;
  placeholder: string;
  type?: string;
}

interface InputListProps {
  inputs: InputItem[];
  errors: Record<string, any>;
  inputClassName?: string;
}

const InputList = ({ inputs, errors, inputClassName }: InputListProps) => {
  return (
    <>
      {inputs.map(({ name, placeholder, type }) => (
        <div key={name} className="flex flex-col gap-1">
          <Input
            formName={name}
            placeholder={placeholder}
            type={type || "text"}
            className={inputClassName}
          />
          {errors?.[name] && (
            <p className="text-red-500 text-sm">{errors[name]?.message}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default InputList;