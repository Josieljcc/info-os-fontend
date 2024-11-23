import { SubmitHandler, useForm } from "react-hook-form";
import technicianSchema, {
  registerTechnicianType,
} from "../schemas/registerTechnician";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hook/useRegister";

const RegisterTechnician = () => {
  const { registerTechnician } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTechnicianType>({
    resolver: zodResolver(technicianSchema),
  });

  const onSubmit: SubmitHandler<registerTechnicianType> = (data) =>
    registerTechnician(data);
  return (
    <div>
      <form>
        <input type="text" {...register("name")} placeholder="Nome" />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="text" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <p>{errors.password.message}</p>}
        <input type="text" {...register("phone")} placeholder="Telefone" />
        {errors.phone && <p>{errors.phone.message}</p>}
      </form>
      <button onClick={handleSubmit(onSubmit)}>Criar</button>
    </div>
  );
};

export default RegisterTechnician;
