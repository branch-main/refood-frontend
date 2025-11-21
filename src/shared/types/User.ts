enum UserRole {
  CUSTOMER = "customer",
  DELIVERY_DRIVER = "delivery_driver",
  RESTAURANT_OWNER = "restaurant_owner",
  ADMIN = "admin",
}

export type UserAddress = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  role: UserRole;
  addresses: UserAddress[];
  favorites: number[];
  createdAt: string | null;
  updatedAt: string | null;
};
