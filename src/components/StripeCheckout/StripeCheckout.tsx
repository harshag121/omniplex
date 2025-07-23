'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  priceId: string;
  productName: string;
  price: string;
}

export default function StripeCheckout({ priceId, productName, price }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();

      if (sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe!.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error('Stripe checkout error:', error);
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{productName}</h3>
        <p className="text-3xl font-bold text-blue-600 mb-4">{price}</p>
        <p className="text-gray-600 mb-6">per month</p>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Test mode: Use card 4242 4242 4242 4242
        </p>
      </div>
    </div>
  );
}
