import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
  notes?: string;
  options?: { name: string; value: string }[];
}

interface CartContextType {
  restaurant?: number;
  items: CartItem[];
  isOpen: boolean;
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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number | undefined>(
    undefined,
  );

  const addItem = (restaurant: number, newItem: CartItem) => {
    if (restaurantId && restaurantId !== restaurant) {
      alert(
        "No puedes agregar productos de diferentes restaurantes al carrito.",
      );
      return;
    }

    setRestaurantId(restaurant);
    setItems((prev) => {
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (items.length === 0) {
      setRestaurantId(undefined);
    }
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

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = items.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        restaurant: restaurantId,
        items,
        isOpen,
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
