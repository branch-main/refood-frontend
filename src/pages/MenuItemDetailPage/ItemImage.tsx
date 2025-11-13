export const ItemImage = ({ image, name, getPlaceholderImage }) => {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg shadow-md border border-gray-200 bg-white">
        <img
          src={image || getPlaceholderImage()}
          alt={name}
          className="w-full h-[380px] md:h-[420px] object-cover"
          onError={(e) => {
            e.target.src = getPlaceholderImage();
          }}
        />
      </div>
    </div>
  );
};
