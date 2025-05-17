import { useFormContext } from "react-hook-form";
import Input from "../input/input";

type FormFieldProps = {
  formName: string;
  label: string;
};

const FormField = ({ formName, label }: FormFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[formName as keyof typeof errors]?.message as
    | string
    | undefined;

  return (
    <div className="flex flex-col gap-2">
      <h2>{label}</h2>
      <Input formName={formName} />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default FormField;
