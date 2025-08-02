import { FiTrash } from "react-icons/fi";

import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import { Service } from "@/types";
import DetailModalService from "../detailModal/serviceModal";

type CardServiceProp = {
  classname?: string;
  service: Service;
};

const CardService = ({ service, classname }: CardServiceProp) => {
  return (
    <div
      className={`flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center ">
        <p className="text-sm font-medium md:w-1/3 w-1/2">{service?.name}</p>
        <p className=" text-sm font-medium w-1/3 pl-6 ">{`${service?.price} R$`}</p>
        <p className="text-sm font-medium md:w-1/3 w-1/2 pl-[4.625rem] md:block hidden">
          {service?.time}
        </p>
      </div>
      <div className="flex gap-2 h-7 items-center">
        <div className="flex gap-2 h-7 items-center">
          <DetailModalService service={service} />
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

export default CardService;
