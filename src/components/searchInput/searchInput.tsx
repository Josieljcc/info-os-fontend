import { BsSlashSquareFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

type SearchInputProp = {
  setValue: (value: React.SetStateAction<string>) => void;
  placeholder?: string;
};

const SearchInput = ({ setValue, placeholder = "Search" }: SearchInputProp) => {
  return (
    <div className="bg-[#3f3f3f] flex items-center gap-2 w-full p-2 text-[#656565] rounded-lg">
      <FiSearch />
      <input
        className="bg-transparent h-full focus:outline-none w-full text-white placeholder:text-[#656565]"
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      <BsSlashSquareFill className="text-secondaryColor" />
    </div>
  );
};

export default SearchInput;
