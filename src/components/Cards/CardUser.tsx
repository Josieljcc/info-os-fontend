import { Client, Technician } from "@/types";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { FiTrash, FiEdit3 } from "react-icons/fi";

type CardProps = {
  item: Technician | Client;
  classname?: string;
};

const Card = ({ item, classname }: CardProps) => {
  return (
    <div
      className={`flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center ">
        <p className="text-sm font-medium md:w-1/3 w-1/2">{item?.name}</p>
        <p className="md:block hidden text-sm font-medium w-1/3">
          {item?.email}
        </p>
        <p className="text-sm font-medium md:w-1/3 w-1/2">{item?.phone}</p>
      </div>
      <div className="flex gap-2 h-7 items-center">
        <ButtonPrimary
          color="bg-mainColor"
          className="md:block hidden rounded-lg px-[.3125rem] py-1 pr-[.35rem]"
        >
          <FiEdit3 className="w-4 h-4" />
        </ButtonPrimary>
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

export default Card;
