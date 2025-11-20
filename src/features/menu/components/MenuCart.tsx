import { FiMinus, FiPlus } from "react-icons/fi";
import { formatPrice, formatRating, getFallbackImage } from "@/shared/utils";
import { useCart } from "@/features/cart/contexts";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoMdCloseCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useRestaurant } from "@/features/restaurants/hooks";
import { BsFillStarFill } from "react-icons/bs";
import { useMenuItem } from "../hooks";

const EmptyCart = () => {
  const { setIsOpen } = useCart();

  return (
    <div className="flex flex-col gap-8 h-full items-center justify-center w-full">
      <div className="h-16 w-16 bg-neutral-100 flex items-center justify-center rounded-full">
        <LiaCartPlusSolid size={32} className="fill-gray-500" />
      </div>

      <span className="text-gray-600 text-sm">
        Aún no tienes productos en tu pedido
      </span>

      <Link
        to="/restaurants"
        className="text-center text-sm cursor-pointer transition-colors text-white bg-red-500 hover:bg-red-600 w-full py-3.5 font-bold rounded-lg"
        onClick={() => setIsOpen(false)}
      >
        Comenzar a comprar
      </Link>
    </div>
  );
};

const CartItem = ({
  id,
  quantity,
  notes,
}: {
  id: number;
  quantity: number;
  notes?: string;
}) => {
  const { data: item } = useMenuItem(id);
  const { updateQuantity } = useCart();

  if (!item) {
    return null;
  }

  return (
    <div
      key={item.id}
      className="pb-4 border-b border-gray-200 flex items-stretch gap-2 w-full"
    >
      <img
        alt={item.name}
        src={getFallbackImage(item.name, item.image)}
        className="w-20 aspect-square object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between w-full gap-2">
        <div>
          <span className="text-gray-800 text-sm line-clamp-2">
            {item.name}
          </span>
          <p className="text-gray-500 text-xs mt-1 line-clamp-3">{notes}</p>
        </div>

        <div className="flex items-end justify-between w-full">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg py-px">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="p-1.5 cursor-pointer rounded transition-colors"
            >
              <FiMinus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-800 text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="p-1.5 cursor-pointer rounded transition-colors"
            >
              <FiPlus className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          <span className="text-sm font-bold text-gray-800">
            {formatPrice(item.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MenuCart = () => {
  const { items, isOpen, setIsOpen, subtotal, total } = useCart();

  const deliveryFee = items.length > 0 ? 2.5 : 0;

  const firstItemId = items[0]?.id;
  const { data: firstItem } = useMenuItem(firstItemId ?? -1);
  const { data: restaurant } = useRestaurant(firstItem?.restaurantId ?? -1);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`transition-all fixed inset-0 bg-black/50 z-99 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="flex flex-col fixed right-0 p-4 bg-white w-[350px] h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-800 font-semibold text-2xl">
              Tu pedido
            </span>
            <IoMdCloseCircle
              className="fill-gray-500 cursor-pointer w-6 h-6"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <span
            className="text-red-500 hover:text-red-600 transition-colors cursor-pointer text-xs font-bold inline-flex items-center gap-3"
            onClick={() => alert("ubcacion")}
          >
            <FaLocationDot className="w-4 h-4" />
            Av. Victor Larco Herrera 777
          </span>
        </div>

        {restaurant && (
          <Link
            to={`/restaurants/${restaurant.id}`}
            className="p-2 mt-2 mb-4 rounded-xl flex gap-2 items-center justify-start bg-neutral-100"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={getFallbackImage(restaurant.name, restaurant.logo)}
              alt={restaurant.name}
              className="shadow-md w-10 h-10 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm">{restaurant.name}</span>
              <div className="flex gap-1">
                <div className="flex items-center">
                  <BsFillStarFill className="fill-amber-500 w-3 h-3 mr-1" />
                  <span className="text-gray-500 text-xs">
                    {formatRating(restaurant.stats.rating - 0.3)}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">
                  {(restaurant.stats.totalReviews === 1 && "(1 opinión)") ||
                    `(${restaurant.stats.totalReviews} opiniones)`}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="bg-white flex flex-1 flex-col min-h-0">
          {items.length == 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col justify-between flex-1 min-h-0">
              <div className="overflow-y-auto space-y-4 pr-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    quantity={item.quantity}
                    notes={item.notes}
                  />
                ))}
              </div>

              <div className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-600">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-gray-600">
                      {formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-gray-800 text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <button
                  className="cursor-pointer mt-2 w-full bg-green-500 text-white text-sm font-semibold py-3
              rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
