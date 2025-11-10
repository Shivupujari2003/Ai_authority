import { loadStripe } from "@stripe/stripe-js";

// ✅ Load Stripe using environment variable (public key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  // ✅ Use your API base from environment variables
  const API_BASE = import.meta.env.VITE_API_URL;

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const session = await res.json();

      if (session.url) {
        // Redirect user to Stripe Checkout
        window.location.href = session.url;
      } else {
        alert("Failed to start payment");
        console.error("Stripe session error:", session);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment failed. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Buy Membership</h1>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
      >
        Pay with Stripe
      </button>
    </div>
  );
}
