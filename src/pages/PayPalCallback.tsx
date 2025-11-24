import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentService } from "@/shared/services/paymentService";
import { Loading } from "@/shared/components/ui";

export const PayPalCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePayPalCallback = async () => {
      const token = searchParams.get("token"); // PayPal Order ID
      const payerID = searchParams.get("PayerID") || searchParams.get("payerId");
      
      // Log all params for debugging
      console.log("PayPal Callback - All params:", {
        token,
        payerID,
        allParams: Object.fromEntries(searchParams.entries())
      });

      if (!token) {
        console.error("No token found in PayPal callback");
        navigate("/payment-failed", { 
          state: { message: "No se encontró información de pago" } 
        });
        return;
      }

      try {
        // Get payment by transaction ID (PayPal Order ID)
        console.log("Fetching payment for token:", token);
        const payment = await paymentService.getPaymentByTransaction(token);
        console.log("Payment found:", payment);

        if (payerID) {
          // Payment approved by user - mark as complete in our backend
          console.log("Payment approved - completing payment:", payment.id);
          
          try {
            await paymentService.completePayment(payment.id);
            console.log("Payment completed successfully");
          } catch (completeError: any) {
            console.error("Error completing payment:", completeError);
            // If payment is already completed, just navigate to order
            if (completeError.response?.status === 400 || 
                completeError.response?.status === 500) {
              console.log("Payment might already be completed, continuing...");
            } else {
              throw completeError;
            }
          }
          
          console.log("Navigating to order page:", payment.orderId);
          // Redirect to order page
          navigate(`/profile/orders/${payment.orderId}`);
        } else {
          // Payment cancelled
          console.warn("No PayerID found - payment was cancelled");
          await paymentService.failPayment(payment.id, "Usuario canceló el pago");
          
          navigate("/payment-failed", {
            state: { 
              message: "El pago fue cancelado",
              orderId: payment.orderId 
            }
          });
        }
      } catch (error) {
        console.error("Error processing PayPal callback:", error);
        navigate("/payment-failed", {
          state: { message: "Error al procesar el pago" }
        });
      }
    };

    handlePayPalCallback();
  }, [searchParams, navigate]);

  return <Loading fullScreen />;
};
