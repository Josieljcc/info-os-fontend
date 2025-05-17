import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import EditTechnicianForm from "@/components/editTechnicianForm/editTechnicianForm";
import Spinner from "@/components/spinner/spinner";
import TechnicianDetail from "@/components/technicianDetail/technicianDetail";
import useTechnician from "@/hook/useTechnician";
import { Technician } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useParams, Link } from "react-router-dom";

const DetailTechnician = () => {
  const { id } = useParams();
  const { getTechnicianById } = useTechnician();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: technician, isFetching } = useQuery({
    queryKey: ["getTechnician"],
    queryFn: () => getTechnicianById(id as string),
  });

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex justify-center pt-24 px-8 pb-5 items-center text-white shadow-md">
      <div className=" h-[60%] md:w-1/2 max-w-[34.5rem] rounded-lg bg-[#3F3F46] flex flex-col p-10 pt-8 justify-between">
        <Link to="/technician">
          <IoArrowBackCircleOutline className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4">
          <RxAvatar className="h-16 w-16" />
          <div>
            <h1 className="font-medium text-lg">{technician?.name}</h1>
            <p className="text-white/85 text-sm">{technician?.email}</p>
            <p className="text-white/85 text-sm">{technician?.phone}</p>
          </div>
        </div>
        {isEditing ? (
          <EditTechnicianForm
            technician={technician as Technician}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <TechnicianDetail technician={technician} />
            <ButtonPrimary onClick={() => setIsEditing(!isEditing)}>
              Editar
            </ButtonPrimary>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailTechnician;
