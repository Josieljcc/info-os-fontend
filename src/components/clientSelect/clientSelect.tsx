import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from "@/types";

type ClientSelectProps = {
  setClientID: React.Dispatch<React.SetStateAction<number>>;
  placeholder: string;
  clients: Client[];
  className?: string;
};

const ClientSelect = ({
  placeholder,
  clients,
  setClientID,
}: ClientSelectProps) => {
  return (
    <div>
      <Select onValueChange={(value) => setClientID(Number(value))}>
        <SelectTrigger className="py-8 px-8 text-xl text-[#D4D4D8] bg-[#52525B] border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#131314f4] text-white border-none">
          <SelectGroup>
            {clients?.map((client) => (
              <SelectItem
                className="hover:bg-[#29292bf4] py-2"
                key={client.id}
                value={String(client.id)}
              >
                {client.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientSelect;
