import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
    });

    const session = await res.json();

    if (session.url) {
      window.location.href = session.url;
    } else {
      alert("Failed to start payment");
      console.log(session);
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
