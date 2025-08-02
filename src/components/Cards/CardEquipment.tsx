import { FiTrash } from "react-icons/fi";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { Equipment } from "@/types";
import DetailModalEquipment from "../detailModal/equipmentModal";

type CardEquipmentProp = {
  classname?: string;
  equipment: Equipment;
};

const CardEquipment = ({ equipment, classname }: CardEquipmentProp) => {
  return (
    <div
      className={`flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center ">
        <p className="text-sm font-medium md:w-1/3 w-1/2">{equipment?.name}</p>
        <p className=" text-sm font-medium w-1/3 pl-5 md:block hidden">{`${equipment?.model}`}</p>
        <p className="text-sm font-medium md:w-1/3 w-1/2 md:pl-16 pl-10  ">
          {equipment?.serialNumber}
        </p>
      </div>
      <div className="flex gap-2 h-7 items-center">
        <div className="flex gap-2 h-7 items-center">
          <DetailModalEquipment equipment={equipment} />
        </div>
        <ButtonPrimary
          color="bg-mainColor"
          className="rounded-lg px-[.3125rem] py-1"
        >
          <FiTrash className="w-4 h-4" />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default CardEquipment;
