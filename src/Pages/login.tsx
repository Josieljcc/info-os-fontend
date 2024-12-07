import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/input/input";
import loginSchema, { loginType } from "../schemas/login";
import { FormProvider, useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttonPrimary/buttonPrimary";
import useLogin from "../hook/useLogin";

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
    <div>
      <FormProvider {...methods}>
        <Input formName="email" placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <Input formName="password" type="password" placeholder="Senha" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </FormProvider>
      <ButtonPrimary disabled={!isValid} onClick={handleSubmit(handleLogin)}>
        Entrar
      </ButtonPrimary>
    </div>
  );
};

export default Login;
