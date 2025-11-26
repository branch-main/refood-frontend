import { apiClient } from "../api";
import { UserAddress } from "../types";

const toAddress = (data: any): UserAddress => ({
  id: data.id,
  street: data.street,
  city: data.city,
  state: data.state,
  zipCode: data.zip_code,
  latitude: data.latitude,
  longitude: data.longitude,
  isDefault: data.is_default,
});

export const addressService = {
  getAddresses: async (): Promise<UserAddress[]> => {
    const response = await apiClient.get<any>("/users/addresses/");
    const addresses = Array.isArray(response) ? response : response?.results ?? [];
    return addresses.map(toAddress);
  },

  getAddress: async (id: number): Promise<UserAddress> => {
    return apiClient.get<any>(`/users/addresses/${id}/`).then(toAddress);
  },

  createAddress: async (data: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
  }): Promise<UserAddress> => {
    return apiClient
      .post<any>("/users/addresses/", {
        street: data.street,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        latitude: data.latitude,
        longitude: data.longitude,
        is_default: data.isDefault || false,
      })
      .then(toAddress);
  },

  updateAddress: async (
    id: number,
    data: Partial<{
      street: string;
      city: string;
      state: string;
      zipCode: string;
      latitude: number;
      longitude: number;
      isDefault: boolean;
    }>,
  ): Promise<UserAddress> => {
    const payload: any = {};
    if (data.street !== undefined) payload.street = data.street;
    if (data.city !== undefined) payload.city = data.city;
    if (data.state !== undefined) payload.state = data.state;
    if (data.zipCode !== undefined) payload.zip_code = data.zipCode;
    if (data.latitude !== undefined) payload.latitude = data.latitude;
    if (data.longitude !== undefined) payload.longitude = data.longitude;
    if (data.isDefault !== undefined) payload.is_default = data.isDefault;

    return apiClient.patch<any>(`/users/addresses/${id}/`, payload).then(toAddress);
  },

  deleteAddress: async (id: number): Promise<void> => {
    return apiClient.delete(`/users/addresses/${id}/`);
  },

  setDefaultAddress: async (id: number): Promise<void> => {
    return apiClient.post(`/users/addresses/${id}/set-default/`, {});
  },
};
