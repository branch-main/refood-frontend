import { ImSearch } from "react-icons/im";

export const SearchBar = ({
  placeholder = "Buscar...",
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-1 items-center rounded-xl shadow-md bg-white text-gray-800 px-4 gap-4">
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 text-sm focus:outline-none py-4"
      />
      <button type="submit" className="right-0 top-0">
        <ImSearch className="h-4 w-4 fill-current" />
      </button>
    </div>
  );
};
