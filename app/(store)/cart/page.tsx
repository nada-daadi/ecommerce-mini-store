'use client';

export default function CartPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Your cart is empty</p>
        <p className="text-gray-500 text-sm mt-2">Start shopping to add items to your cart</p>
      </div>
    </main>
  );
}