declare global {
  interface Window {
    Stripe: (key: string) => {
      redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: { message: string } }>;
    };
  }
}

export {};
