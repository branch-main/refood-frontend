// Mock API for development - Replace with real backend
// This allows testing login without a backend

export const mockAuthAPI = {
  // Mock partner credentials
  partnerUsers: [
    {
      id: 1,
      email: "demo@partner.com",
      password: "demo123",
      firstName: "Demo",
      lastName: "Partner",
      role: "restaurant_owner" as const,
      restaurantId: 1,
      restaurantName: "Demo Restaurant",
    },
  ],

  // Mock customer credentials
  customerUsers: [
    {
      id: 2,
      email: "demo@customer.com",
      password: "demo123",
      firstName: "Demo",
      lastName: "Customer",
      role: "customer" as const,
    },
  ],

  // Simulate API delay
  delay: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Generate mock JWT token
  generateToken: (userId: number) => {
    return `mock_token_${userId}_${Date.now()}`;
  },

  // Partner login
  partnerLogin: async (email: string, password: string) => {
    await mockAuthAPI.delay(800); // Simulate network delay

    const user = mockAuthAPI.partnerUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw {
        response: {
          status: 401,
          data: { message: "Invalid credentials" },
        },
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      token: mockAuthAPI.generateToken(user.id),
      user: userWithoutPassword,
    };
  },

  // Customer login
  customerLogin: async (email: string, password: string) => {
    await mockAuthAPI.delay(800);

    const user = mockAuthAPI.customerUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw {
        response: {
          status: 401,
          data: { message: "Invalid credentials" },
        },
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      token: mockAuthAPI.generateToken(user.id),
      user: userWithoutPassword,
    };
  },

  // Get current user from token
  getCurrentUser: async (token: string) => {
    await mockAuthAPI.delay(300);

    if (!token || !token.startsWith("mock_token_")) {
      throw { response: { status: 401 } };
    }

    const userId = parseInt(token.split("_")[2]);
    const allUsers = [...mockAuthAPI.partnerUsers, ...mockAuthAPI.customerUsers];
    const user = allUsers.find((u) => u.id === userId);

    if (!user) {
      throw { response: { status: 401 } };
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};

// Check if we should use mock API
export const useMockAPI = () => {
  // Use mock API if no backend URL is configured or in development
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return !apiUrl || apiUrl === "http://localhost:3000/api";
};
