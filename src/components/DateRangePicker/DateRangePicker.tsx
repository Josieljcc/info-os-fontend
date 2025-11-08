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

interface DateRangePickerProps {
  value?: { startDate?: string; endDate?: string };
  onChange?: (dates: { startDate?: string; endDate?: string }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);

  const startDate = value?.startDate
    ? new Date(`${value.startDate}T00:00:00`)
    : undefined;
  const endDate = value?.endDate
    ? new Date(`${value.endDate}T00:00:00`)
    : undefined;

  const handleSelectStartDate = (date?: Date) => {
    if (!date) return;
    const formatted = format(date, "yyyy-MM-dd");
    onChange?.({ startDate: formatted, endDate: value?.endDate });
    setOpenStartDate(false);
  };

  const handleSelectEndDate = (date?: Date) => {
    if (!date) return;
    const formatted = format(date, "yyyy-MM-dd");
    onChange?.({ startDate: value?.startDate, endDate: formatted });
    setOpenEndDate(false);
  };

  return (
    <div className="flex gap-2">
      <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-start"
            className="w-48 justify-between font-normal"
          >
            {startDate ? format(startDate, "dd/MM/yyyy") : "Data de Início"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            captionLayout="dropdown"
            onSelect={handleSelectStartDate}
          />
        </PopoverContent>
      </Popover>
      <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-end"
            className="w-48 justify-between font-normal"
          >
            {endDate ? format(endDate, "dd/MM/yyyy") : "Data Final"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            captionLayout="dropdown"
            onSelect={handleSelectEndDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;