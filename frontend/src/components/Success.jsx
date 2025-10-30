export default function Success() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="mt-4 text-lg">Thank you! Your payment has been received.</p>
      <a href="/certificates" className="mt-6 text-blue-600 underline">
        Go to Dashboard
      </a>
    </div>
  );
}
