"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
const DatePicker = () => {
  const [open, setOpen] = React.useState(false);
  const { watch, setValue } = useFormContext();

  const date = watch("forecastDate");

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date : "Selecionar Data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setValue("forecastDate", format(date as Date, "yyyy-MM-dd"));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
