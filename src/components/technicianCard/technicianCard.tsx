import { Technician } from "@/types";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { GrFormEdit } from "react-icons/gr";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

type TechnicianCardProps = {
  technician: Technician;
};

const TechnicianCard = ({ technician }: TechnicianCardProps) => {
  return (
    <div className="flex justify-between bg-[#3F3F46] text-white rounded-lg shadow-md border border-gray-600 md:flex-col">
      <div className="hidden md:flex md:justify-center md:items-center md:text-6xl md:mt-2">
        <RxAvatar />
      </div>
      <div className="p-2 md:flex md:gap-3">
        <div>
          <h3 className="text-lg font-semibold md:w-28 lg:w-full truncate">
            {technician.name}
          </h3>
          <p className="text-sm md:w-32 lg:w-full truncate">
            {technician.email}
          </p>
          <p className="text-sm md:w-32 lg:w-full truncate">
            {technician.phone}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <ButtonPrimary
          color="bg-sky-700"
          className="text-3xl h-1/2 w-24 rounded-s-none rounded-r-none md:h-full md:w-full md:rounded-b"
        >
          <GrFormEdit />
        </ButtonPrimary>
        <ButtonPrimary
          color="bg-red-500"
          className="text-2xl h-1/2 w-24 rounded-s-none rounded-t-none  md:h-full md:w-full"
        >
          <RiDeleteBin7Line />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default TechnicianCard;
