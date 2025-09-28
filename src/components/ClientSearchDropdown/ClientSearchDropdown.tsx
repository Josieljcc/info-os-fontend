import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hook/useDebounce/useDebounce";
import { useClientSearch } from "@/hook/useClient/useSearchClient";
import { Client } from "@/types";
import { useFormContext } from "react-hook-form";
import DrawerClient from "../drawerClient/drawerClient";

export function ClientSearchDropdown() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [open, setOpen] = useState(false);
  const { setValue } = useFormContext();

  const { data: clients } = useClientSearch({
    searchTerm: { name: debouncedSearch },
  });

  const handleSelectClient = (client: Client) => {
    if (!client) {
      return;
    }
    setSearch(client.name);
    setValue("clientId", client.id);
    setValue("client", client);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <input
          type="text"
          className="h-10 w-full pl-8 shadow-md rounded-lg border-2 border-transparent
                     bg-[#52525B] p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
      </PopoverTrigger>
      <PopoverContent
        onClick={(event) => event.stopPropagation()}
        className="w-full bg-[#52525B] text-[#D4D4D8]"
      >
        <ul className="space-y-2 flex flex-col">
          {!clients?.length ? (
            <>
              <p className="text-zinc-200 text-center">
                Nenhum cliente encontrado
              </p>
              <DrawerClient />
            </>
          ) : (
            clients?.map((client) => (
              <button
                key={client.id}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded"
                onClick={() => {
                  handleSelectClient(client);
                  setSearch(client.name);
                }}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleSelectClient(client);
                    setSearch(client.name);
                  }
                }}
              >
                {client.name}
              </button>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
