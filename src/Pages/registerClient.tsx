import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { role } from "../types";
import { useNavigate } from "react-router-dom";
import Input from "../components/input/input";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import clientSchema, { registerClientType } from "../schemas/registerClient";
import { FormProvider, useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttonPrimary/buttonPrimary";
import useRegister from "../hook/useRegister";

const RegisterClient = () => {
  const { user, setUser } = useContext(UserContext);

  const { registerClient } = useRegister();

  const navigate = useNavigate();

  const methods = useForm<registerClientType>({
    resolver: zodResolver(clientSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateClient = (data: registerClientType) => {
    registerClient(data, user.token);
  };

  useEffect(() => {
    const localStorageUser =
      JSON.parse(localStorage.getItem("user") as string) || {};

    if (
      user.role === role.client ||
      localStorageUser?.role === role.client ||
      (!user.token && !localStorageUser.token)
    ) {
      navigate("/login");
    }

    setUser(localStorageUser);
  }, []);

  return (
    <div>
      <FormProvider {...methods}>
        <Input formName="name" placeholder="Nome" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input formName="email" placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <Input formName="password" placeholder="Senha" type="password" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <Input formName="phone" placeholder="Telefone" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
        <Input formName="address" placeholder="Endereço" />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
        <ButtonPrimary onClick={handleSubmit(handleCreateClient)}>
          Enviar
        </ButtonPrimary>
      </FormProvider>
    </div>
  );
};

export default RegisterClient;
