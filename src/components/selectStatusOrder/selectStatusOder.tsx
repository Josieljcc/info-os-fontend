import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StatusType } from "@/types";
import { useFormContext } from "react-hook-form";
import { items } from "./constants";

type SelectProps = {
  placeholder: string;
};

const SelectStatusOder = ({ placeholder }: SelectProps) => {
  const { setValue } = useFormContext();

  const handleStatusOrder = (stat: StatusType) => {
    setValue("status", stat);
  };

  return (
    <div className="">
      <Select onValueChange={(value) => handleStatusOrder(value as StatusType)}>
        <SelectTrigger className="py-4 px-4 text-xl w-1/4 text-[#D4D4D8] hover:border-blue-500 focus:outline-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#131314f4] text-white border-none">
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                className="hover:bg-[#29292bf4] py-2"
                value={item.value}
                key={item.id}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="pb-1">{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectStatusOder;
