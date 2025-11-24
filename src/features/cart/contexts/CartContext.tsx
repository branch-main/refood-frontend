import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { menuService } from "@/shared/services";

export interface CartItem {
  id: number;
  price: number;
  discountPrice?: number;
  additionalPrice: number;
  quantity: number;
  notes?: string;
  options?: { name: string; value: string; price: number }[];
}

interface CartContextType {
  restaurantId?: number;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (restaurantId: number, item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cart_items";
const RESTAURANT_STORAGE_KEY = "cart_restaurant_id";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [restaurantId, setRestaurantId] = useState<number | undefined>(() => {
    const saved = localStorage.getItem(RESTAURANT_STORAGE_KEY);
    return saved ? Number(saved) : undefined;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateItems = async () => {
      if (!restaurantId || items.length === 0) {
        setIsLoading(false);
        return;
      }

      const validated: CartItem[] = [];

      for (const item of items) {
        try {
          const menuItem = await menuService.getMenuItem(item.id);

          if (menuItem.restaurantId === restaurantId) {
            validated.push(item);
          }
        } catch {}
      }

      if (validated.length === 0) {
        clearCart();
      } else {
        setItems(validated);
      }

      setIsLoading(false);
    };

    validateItems();
  }, []);

  useEffect(() => {
    if (items.length > 0 && restaurantId) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(RESTAURANT_STORAGE_KEY, restaurantId.toString());
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(RESTAURANT_STORAGE_KEY);
    }
  }, [items, restaurantId]);

  const addItem = (restId: number, item: CartItem) => {
    if (restaurantId && restaurantId !== restId) return false;

    setRestaurantId(restId);
    setItems((prev) => [...prev, { ...item, quantity: item.quantity ?? 1 }]);

    return true;
  };

  const removeItem = (id: number) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      if (updated.length === 0) setRestaurantId(undefined);
      return updated;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setRestaurantId(undefined);
    setItems([]);
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const subtotal = items.reduce(
    (s, i) =>
      s + ((i.discountPrice ?? i.price) + i.additionalPrice) * i.quantity,
    0,
  );

  const deliveryFee = items.length ? 2 : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        restaurantId,
        items,
        isOpen,
        isLoading,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
