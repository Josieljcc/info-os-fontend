import { SubmitHandler, useForm } from "react-hook-form";
import technicianSchema, {
  registerTechnicianType,
} from "../schemas/registerTechnician";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterTechnician = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTechnicianType>({
    resolver: zodResolver(technicianSchema),
  });

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <div>
      <form>
        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </form>
      <button onClick={handleSubmit(onSubmit)}>Criar</button>
    </div>
  );
};

export default RegisterTechnician;
