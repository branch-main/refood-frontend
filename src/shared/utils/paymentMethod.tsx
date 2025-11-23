import { PaymentMethod } from "@/shared/services";
import { BsStripe, BsPaypal } from "react-icons/bs";

export const getPaymentMethodIcon = (method: PaymentMethod) => {
  switch (method) {
    case "STRIPE":
      return <BsStripe size={20} className="fill-[#6358f7]" />;
    case "PAYPAL":
      return <BsPaypal size={20} className="fill-blue-900" />;
    case "YAPE":
      return <span className="font-bold">Y</span>;
  }
};

export const getPaymentMethodText = (method: PaymentMethod) => {
  switch (method) {
    case "STRIPE":
      return "Stripe";
    case "PAYPAL":
      return "PayPal";
    case "YAPE":
      return "Yape";
  }
};
