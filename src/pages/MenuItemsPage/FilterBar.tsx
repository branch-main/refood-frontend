import { Input } from "../../components/common";

export const FilterBar = ({ filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr] gap-4 mb-8">
      <Input
        type="text"
        name="search"
        placeholder="Buscar alimentos..."
        value={filters.search}
        onChange={onChange}
      />
    </div>
  );
};
