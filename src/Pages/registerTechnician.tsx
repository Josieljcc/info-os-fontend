import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import technicianSchema, {
  registerTechnicianType,
} from "../schemas/registerTechnician";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/input/input";
import logo from "../../public/assets/logoInfos.png";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiKey2Line, RiCellphoneLine } from "react-icons/ri";
import ButtonPrimary from "../components/buttonPrimary/buttonPrimary";

import { Link } from "react-router-dom";
import SecondaryBackground from "../components/SecondaryBackground/SecondaryBackground";
import useTechnician from "@/hook/useTechnician";

const RegisterTechnician = () => {
  const { registerTechnician } = useTechnician();

  const methods = useForm<registerTechnicianType>({
    resolver: zodResolver(technicianSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit: SubmitHandler<registerTechnicianType> = (data) =>
    registerTechnician(data);

  return (
    <div className="h-dvh md:flex md:flex-row-reverse">
      <div className="h-[90%] bg-main-bg bg-cover bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:relative md:h-full md:w-1/2 md:items-center md:p-0">
        <div className="bg-secondaryColor rounded-lg shadow-lg md:w-1/2 pb-11">
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
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <Input
                Icon={MdOutlineMailOutline}
                formName="email"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <Input
                Icon={RiKey2Line}
                formName="password"
                type="password"
                placeholder="Senha"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <Input
                Icon={RiCellphoneLine}
                formName="phone"
                type="text"
                placeholder="Telefone"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </FormProvider>
            <ButtonPrimary
              children="Criar"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
              className="mx-8 mt-4"
            />
            <p className="text-zinc-200 text-center">
              Já tem cadastro?{" "}
              <Link
                to="/login"
                className="text-blue-400 underline hover:text-blue-500 transition-all duration-200"
              >
                Acesse aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
      <SecondaryBackground />
    </div>
  );
};

export default RegisterTechnician;
