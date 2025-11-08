import { OrderResponse } from "@/types";
import DetailModalOrderService from "../detailModal/orderServiceModal";
import DeleteButton from "../deleteButton/deleteButton";
import useDeleteOrderService from "@/hook/useOrderService/useDeleteOrderService";
import { format } from "date-fns";
import { items } from "@/components/selectStatusOrder/constants";
import { cn } from "@/lib/utils";

type CardOrderServiceProps = { classname?: string; order: OrderResponse };

const CardOrderService = ({ order, classname }: CardOrderServiceProps) => {
  const { deleteOrderService } = useDeleteOrderService();

  const handleDelete = async () => {
    await deleteOrderService(order.id);
  };

  const currentStatus = items.find((item) => item.value === order.status);

  return (
    <div
      className={cn(
        "flex justify-between gap-4 h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor",
        classname
      )}
    >
      <p className="text-sm font-medium">#{order?.id}</p>
      <p className="text-sm font-medium flex-1 truncate">
        {order?.client?.name}
      </p>
      <p className="text-sm font-medium hidden sm:block">
        {format(order?.openingDate, "dd-MM-yyyy")}
      </p>
      <p className="text-sm font-medium hidden sm:block">
        {format(order?.forecastDate, "dd-MM-yyyy")}
      </p>

      <div className="flex justify-start items-center gap-1 sm:min-w-[100.5px]">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            currentStatus?.color || "bg-gray-500"
          )}
        />
        <span className="text-sm text-gray-300 capitalize hidden sm:block">
          {currentStatus?.label || "sem status"}
        </span>
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
