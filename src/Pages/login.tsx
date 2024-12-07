import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/input/input";
import loginSchema, { loginType } from "../schemas/login";
import { FormProvider, useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttonPrimary/buttonPrimary";
import useLogin from "../hook/useLogin";
import SecondaryBackground from "../components/SecondaryBackground/SecondaryBackground";
import logo from "../../assets/logoInfos.png";

const Login = () => {
  const { postLogin } = useLogin();

  const methods = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const handleLogin = (data: loginType) => {
    postLogin(data);
  };

  return (
    <div className="h-screen md:flex md:flex-row-reverse">
      <div className="h-[90%] bg-main-bg bg-cover bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:relative md:h-full md:w-1/2 md:items-center md:p-0">
        <div className="bg-[#3F3F46] rounded-lg shadow-lg md:w-1/2">
          <div className="flex justify-center p-8">
            <img src={logo} alt="logo info OS" />
          </div>
          <div className="flex flex-col gap-3 px-3">
            <FormProvider {...methods}>
              <Input formName="email" placeholder="Email" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <Input formName="password" type="password" placeholder="Senha" />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </FormProvider>
            <ButtonPrimary
              disabled={!isValid}
              onClick={handleSubmit(handleLogin)}
              className="mx-8 mt-4 mb-10"
            >
              Entrar
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <SecondaryBackground />
    </div>
  );
};

export default Login;
