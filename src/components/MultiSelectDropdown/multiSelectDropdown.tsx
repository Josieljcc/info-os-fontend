import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useDebounce from '@/hook/useDebounce/useDebounce';
import { useFormContext } from 'react-hook-form';
import DrawerService from '../drawerService/drawerService';
import { useServiceSearch } from '@/hook/Service/useSearchService';
import { Service } from '@/types';

export function MultiSelectServicesDropdown() {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 400);
    const [open, setOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const { setValue } = useFormContext();


    const { data: services } = useServiceSearch(
        { searchTerm: debouncedSearch, enabled: true }
    );

    const handleSelectService = (service: Service) => {
        if (!service) {
            return
        }
        const uniqueSelectedServices = new Set([...selectedServices, service]);
        setSelectedServices([...uniqueSelectedServices]);
        setValue("services", selectedServices);
        setOpen(false);
    }

    const handleRemoveService = (service: Service) => {
        const index = selectedServices.findIndex((s) => s.id === service.id);
        setSelectedServices([...selectedServices.slice(0, index), ...selectedServices.slice(index + 1)]);
        setValue("services", selectedServices);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div className='relative'>
                <PopoverTrigger asChild>
                    <input
                        type="text"
                        className="h-10 w-full pl-8 shadow-md rounded-lg border-2 border-transparent
                      bg-[#52525B] p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none
                        py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
                        placeholder={selectedServices.length ? "" : "Buscar serviço..."}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                    />

                </PopoverTrigger>
                <div className='absolute flex items-center left-4 top-1/2 -translate-y-1/2 gap-2'>
                    {selectedServices.map((service) => (
                        <button
                            className="flex items-center gap-2 rounded-lg border-2 border-transparent
                            bg-zinc-500 p-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none
                            py-2 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
                            key={service.id}
                            onClick={() => handleRemoveService(service)}>
                            <p>{service.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    ))}
                </div>
            </div>
            <PopoverContent onClick={(event) => event.stopPropagation()} className="w-full bg-[#52525B] text-[#D4D4D8]">
                <div className="space-y-2 flex flex-col">
                    {!services?.length
                        ?
                        <>
                            <p className="text-zinc-200 text-center">Nenhum servico encontrado</p>
                            <DrawerService />
                        </>
                        :
                        services?.map((service) => (
                            <button
                                key={service.id}
                                className=" cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded"
                                onClick={() => {
                                    handleSelectService(service);
                                    setSearch("");
                                }}
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        handleSelectService(service);
                                        setSearch("");
                                    }
                                }}
                            >
                                {service.name}
                            </button>
                        ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
