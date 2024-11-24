import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import technicianSchema, {
  registerTechnicianType,
} from "../schemas/registerTechnician";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hook/useRegister";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/input/input";
import logo from "../../assets/Logo.png";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiKey2Line } from "react-icons/ri";
import { RiCellphoneLine } from "react-icons/ri";
import ButtonPrimary from "../components/buttonPrimary/buttonPrimary";
import BackgroundFooter from "../components/backgroundPanel/backgroundPanel";

const RegisterTechnician = () => {
  const { registerTechnician } = useRegister();

  const methods = useForm<registerTechnicianType>({
    resolver: zodResolver(technicianSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<registerTechnicianType> = (data) =>
    registerTechnician(data);
  return (
    <div className="md:flex md:flex-row-reverse">
      <div className="h-full bg-main-bg bg-cover bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:relative md:h-screen md:w-1/2 md:items-center md:p-0">
        <div className="bg-[#3F3F46] rounded-lg shadow-lg md:w-1/2">
          <div className="flex justify-center p-8">
            <img src={logo} alt="logo info OS" />
          </div>
          <div className="flex flex-col gap-3 px-3">
            <FormProvider {...methods}>
              <Input
                Icon={LuUser2}
                formName="name"
                type="text"
                placeholder="Nome"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <Input
                Icon={MdOutlineMailOutline}
                formName="email"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <Input
                Icon={RiKey2Line}
                formName="password"
                type="password"
                placeholder="Senha"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <Input
                Icon={RiCellphoneLine}
                formName="phone"
                type="text"
                placeholder="Telefone"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </FormProvider>
            <div className="px-8 pt-6 pb-10">
              <ButtonPrimary
                children="Criar"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
      <BackgroundFooter />
    </div>
  );
};

export default RegisterTechnician;
