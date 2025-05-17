import { Client, Technician } from "@/types";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";

type CardProps = {
  item: Technician | Client;
  classname?: string;
};

const Card = ({ item, classname }: CardProps) => {
  return (
    <div
      className={`flex justify-between text-white rounded-lg shadow-md border border-gray-600 flex-col max-w-[42rem] pb-4 pt-4 px-4 bg-[#1c2029] ${classname}`}
    >
      <div className="flex text-6xl justify-center">
        <RxAvatar />
      </div>
      <div className="py-5">
        <div>
          <h3 className="text-lg font-semibold w-full ">{item?.name}</h3>
          <p className="text-sm w-full">{item?.email}</p>
          <p className="text-sm w-full">{item?.phone}</p>
        </div>
      </div>
      <div className="flex gap-20">
        <ButtonPrimary
          color="bg-sky-700"
          className="text-2xl h-full w-full rounded-full"
        >
          <FiEdit2 />
        </ButtonPrimary>
        <ButtonPrimary
          color="bg-red-500"
          className="text-2xl h-full w-full rounded-full"
        >
          <RiDeleteBin7Line/>
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Card;
