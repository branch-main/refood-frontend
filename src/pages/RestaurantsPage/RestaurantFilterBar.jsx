import { Input } from "../../components/common";

export const RestaurantFilterBar = ({ filters, onChange }) => {
  return (
    <div className="mb-8">
      <Input
        type="text"
        name="search"
        placeholder="Buscar restaurantes..."
        value={filters.search}
        onChange={onChange}
      />
    </div>
  );
};
