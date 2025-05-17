import { Technician } from "@/types";

type TechnicianDetailProp = {
  technician: Technician | undefined;
};

const TechnicianDetail = ({ technician }: TechnicianDetailProp) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Nome:</h2>
        <p className="text-sm font ">{technician?.name}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Email:</h2>
        <p className="text-sm ">{technician?.email}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Telefone:</h2>
        <p className="text-sm ">{technician?.phone}</p>
      </div>
    </div>
  );
};

export default TechnicianDetail;
