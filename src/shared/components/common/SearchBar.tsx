import { ImSearch } from "react-icons/im";

export const SearchBar = ({
  placeholder = "Buscar...",
  value,
  onChange,
  onSubmit,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}) => {
  const isEmpty = value.trim() === "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit && !isEmpty) {
          onSubmit();
        }
      }}
      className="flex flex-1 items-center rounded-xl shadow-md bg-white text-gray-800 px-4 gap-4"
    >
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 text-sm focus:outline-none py-4 caret-red-500"
      />
      <button type="submit" className="right-0 top-0">
        <ImSearch
          className={`h-4 w-4 transition-colors ${isEmpty ? "fill-gray-400" : "fill-gray-500"}`}
        />
      </button>
    </form>
  );
};
