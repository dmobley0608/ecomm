interface UmamiTracker {
  track: (
    eventName: string,
    eventData: {
      cartId: string;
      productId: string;
      productName: string;
      price: number;
      currency: string;
    }
  ) => void;
}

declare interface Window {
  umami?: UmamiTracker;
}
