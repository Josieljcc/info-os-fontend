import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hook/useDebounce/useDebounce";
import { useFormContext } from "react-hook-form";
import DrawerPart from "../drawerPart/drawerPart";
import { Part } from "@/types";
import { usePartSearch } from "@/hook/useFormOrder/useSearchPart";

const MultiSelectPart = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [open, setOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const { setValue } = useFormContext();

  const { data: parts } = usePartSearch({
    searchTerm: debouncedSearch,
    enabled: true,
  });

  const handleSelectPart = (part: Part) => {
    if (!part) {
      return;
    }
    const uniqueSelectedParts = new Set([...selectedParts, part]);
    setSelectedParts([...uniqueSelectedParts]);
    setValue("parts", [...uniqueSelectedParts]);
    setOpen(false);
  };

  const handleRemovePart = (part: Part) => {
    const index = selectedParts.findIndex((s) => s.id === part.id);
    setSelectedParts([
      ...selectedParts.slice(0, index),
      ...selectedParts.slice(index + 1),
    ]);
    setValue("parts", selectedParts);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <input
            type="text"
            className="h-10 w-full pl-8 shadow-md rounded-lg border-2 border-transparent
                      bg-[#52525B] p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none
                        py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
            placeholder={selectedParts.length ? "" : "Buscar peças..."}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </PopoverTrigger>
        <div className="absolute flex items-center left-4 top-1/2 -translate-y-1/2 gap-2">
          {selectedParts.map((Part) => (
            <button
              className="flex items-center gap-2 rounded-lg border-2 border-transparent
                            bg-zinc-500 p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none
                            py-2 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
              key={Part.id}
              onClick={() => handleRemovePart(Part)}
            >
              <p>{Part.name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <PopoverContent
        onClick={(event) => event.stopPropagation()}
        className="w-full bg-[#52525B] text-[#D4D4D8]"
      >
        <div className="space-y-2 flex flex-col">
          {!parts ? (
            <>
              <p className="text-zinc-200 text-center">
                Nenhuma peça encontrada
              </p>
              <DrawerPart />
            </>
          ) : (
            parts?.map((part) => (
              <button
                key={part.id}
                className=" cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded"
                onClick={() => {
                  handleSelectPart(part);
                  setSearch("");
                }}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleSelectPart(part);
                    setSearch("");
                  }
                }}
              >
                {part.name}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectPart;
