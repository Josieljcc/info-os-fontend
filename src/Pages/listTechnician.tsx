import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import useTechnician from "@/hook/useTechnician";
import { Technician } from "@/types";
import { useEffect, useState } from "react";

const ListTechnician = () => {
  const [technicians, setTechnicians] = useState<Technician[] | undefined>([]);
  const { getAllTechnician, isLoading } = useTechnician();

  useAuthentication();

  useEffect(() => {
    const getTechnicians = async () => {
      const technicians = await getAllTechnician();
      setTechnicians(technicians);
    };
    getTechnicians();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Técnicos
      </h2>
      {technicians?.length === 0 ? (
        <div>
          <p>Nenhum técnico encontrado</p>
          <ButtonPrimary>Criar Técnico</ButtonPrimary>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
          {technicians?.map((technician) => (
            <Card key={technician.id} item={technician} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTechnician;
