import { BsSlashSquareFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

type SearchInputProp = {
  setValue: (value: React.SetStateAction<string>) => void;
};

const SearchInput = ({ setValue }: SearchInputProp) => {
  return (
    <div className="bg-[#3f3f3f] flex items-center gap-2 w-full p-2 text-[#656565] rounded-lg">
      <FiSearch className="" />
      <input
        className="bg-transparent h-full focus:outline-none text-white placeholder:text-[#656565]"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search"
      />
      <BsSlashSquareFill className="text-[#323232]" />
    </div>
  );
};

export default SearchInput;
