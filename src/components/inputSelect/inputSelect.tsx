import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  placeholder: string;
  list?: SelectType[];
  className?: string;
};

export type SelectType = {
  id: number;
  name: string;
};

const InputSelect = ({ placeholder, setValue, list = [] }: SelectProps) => {
  return (
    <div>
      <Select onValueChange={(value) => setValue(Number(value))}>
        <SelectTrigger className="py-8 px-8 text-xl text-[#D4D4D8] bg-[#52525B] border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#131314f4] text-white border-none">
          <SelectGroup>
            {list?.map((item) => 
              <SelectItem
                className="hover:bg-[#29292bf4] py-2"
                key={item?.id}
                value={String(item?.id)}
              >
                {item?.name}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InputSelect;
