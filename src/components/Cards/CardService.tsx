import { Service } from "@/types";
import DeleteButton from "../deleteButton/deleteButton";
import DetailModalService from "../detailModal/serviceModal";
import useDeleteService from "@/hook/useService/useDeletePart";

type CardServiceProp = {
  classname?: string;
  service: Service;
};

const CardService = ({ service, classname }: CardServiceProp) => {
  const { deleteService } = useDeleteService();

  const handleDelete = async () => {
    await deleteService(service.id);
  };
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
          <DeleteButton
            name={service.name}
            typeLabel="do serviço"
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CardService;
