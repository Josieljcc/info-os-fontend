import { Part } from "@/types";
import { FiEdit3, FiTrash } from "react-icons/fi";

import ButtonPrimary from "../buttonPrimary/buttonPrimary";

type CardPartProp = {
  classname?: string;
  part: Part;
};

const CardPart = ({ part, classname }: CardPartProp) => {
  return (
    <div
      className={`flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center ">
        <p className="text-sm font-medium md:w-1/3 w-1/2">{part?.name}</p>
        <p className="md:block hidden text-sm font-medium w-1/3 pl-6">
          {`${part?.price} R$`}
        </p>
        <p className="text-sm font-medium md:w-1/3 w-1/2 pl-[4.625rem]">
          {part?.quantity}
        </p>
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

export default CardPart;
