"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface DatePickerListProps {
  value?: string;
  onChange?: (date: string) => void;
}

const DatePickerList: React.FC<DatePickerListProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const handleSelect = (date?: Date) => {
    if (!date) return;
    const formatted = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    onChange?.(formatted);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-list"
            className="w-48 justify-between font-normal"
          >
            {selectedDate
              ? format(selectedDate, "dd/MM/yyyy")
              : "Selecionar Data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerList;
