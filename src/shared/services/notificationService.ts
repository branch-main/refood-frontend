import { apiClient } from "../api";

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  data: Record<string, any> | null;
  isRead: boolean;
  createdAt: string;
}

interface NotificationResponse {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  data: Record<string, any> | null;
  is_read: boolean;
  created_at: string;
}

const toNotification = (data: NotificationResponse): Notification => ({
  id: data.id,
  userId: data.user_id,
  type: data.type,
  title: data.title,
  message: data.message,
  data: data.data,
  isRead: data.is_read,
  createdAt: data.created_at,
});

export const notificationService = {
  getNotifications: async (limit: number = 50): Promise<Notification[]> => {
    const data = await apiClient.get<NotificationResponse[]>(
      `/notifications/?limit=${limit}`
    );
    return data.map(toNotification);
  },

  getUnreadCount: async (): Promise<number> => {
    const data = await apiClient.get<{ count: number }>(
      "/notifications/unread_count/"
    );
    return data.count;
  },

  markAsRead: async (notificationId: number): Promise<Notification> => {
    const data = await apiClient.post<NotificationResponse>(
      `/notifications/${notificationId}/read/`
    );
    return toNotification(data);
  },

  markAllAsRead: async (): Promise<number> => {
    const data = await apiClient.post<{ count: number }>(
      "/notifications/read_all/"
    );
    return data.count;
  },

  deleteNotification: async (notificationId: number): Promise<void> => {
    await apiClient.delete(`/notifications/${notificationId}/`);
  },
};
