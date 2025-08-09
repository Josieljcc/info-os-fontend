import { EquipmentType } from "@/schemas/equipment";

type equipmentDetailProp = {
  equipment: EquipmentType | undefined;
};

const EquipmentDetailForm = ({ equipment }: equipmentDetailProp) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Nome:</h2>
        <p className="text-sm font ">{equipment?.name}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Modelo:</h2>
        <p className="text-sm ">{equipment?.model}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Numero de Serie:</h2>
        <p className="text-sm ">{equipment?.serialNumber}</p>
      </div>
      <div className="flex justify-between py-4 pb-9 border-b-[.1875rem] border-gray-500/45">
        <h2>Descrição:</h2>
        <p className="text-sm ">{equipment?.description}</p>
      </div>
    </div>
  );
};

export default EquipmentDetailForm;
