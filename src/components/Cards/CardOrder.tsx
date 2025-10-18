import { OrderResponse } from "@/types";
import { formatDateBR } from "@/lib/utils";
import DetailModalOrderService from "../detailModal/orderServiceModal";
import DeleteButton from "../deleteButton/deleteButton";
import useDeleteOrderService from "@/hook/useOrderService/useDeleteOrderService";

type CardOrderServiceProps = { classname?: string; order: OrderResponse };

const CardOrderService = ({ order, classname }: CardOrderServiceProps) => {
  const { deleteOrderService } = useDeleteOrderService();
  const handleDelete = async () => {
    await deleteOrderService(order.id);
  };
  return (
    <div
      className={`flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center">
        <p className="text-sm font-medium md:w-1/3 w-1/2">#{order?.id}</p>
        <p className="text-sm font-medium w-1/3 pl-6">{order?.client?.name}</p>
        <p className="text-sm font-medium w-1/3 pl-6">
          {formatDateBR(order?.openingDate)}
        </p>
        <p className="text-sm font-medium w-1/3 pl-6">
          {formatDateBR(order?.forecastDate)}
        </p>
      </div>
      <div className="flex gap-2 h-7 items-center">
        <DetailModalOrderService order={order} />
        <DeleteButton
          name={String(order.id)}
          typeLabel="da ordem de serviço"
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};
export default CardOrderService;
