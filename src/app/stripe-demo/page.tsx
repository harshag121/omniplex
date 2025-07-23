import StripeCheckout from '@/components/StripeCheckout/StripeCheckout';
import Link from 'next/link';

export default function StripeDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Stripe Payment Integration Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test the payment system using Stripe's test mode
          </p>
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Test Mode:</strong> Use card number <code className="bg-yellow-100 px-2 py-1 rounded">4242 4242 4242 4242</code> with any future expiry date and any CVC.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Stripe Checkout Component */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pro Plan Subscription</h2>
            <StripeCheckout 
              priceId="price_test_pro_monthly" 
              productName="Pro Plan" 
              price="$10" 
            />
          </div>

          {/* Instructions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Testing Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
              <li>Click "Subscribe Now" to start the checkout process</li>
              <li>You'll be redirected to Stripe's secure checkout page</li>
              <li>Use the test card: <code className="bg-gray-100 px-1 rounded">4242 4242 4242 4242</code></li>
              <li>Enter any future expiry date (e.g., 12/25)</li>
              <li>Enter any 3-digit CVC (e.g., 123)</li>
              <li>Enter any email and billing details</li>
              <li>Complete the payment to see the success page</li>
            </ol>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Other Test Cards:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><code>4000 0000 0000 0002</code> - Declined card</li>
                <li><code>4000 0000 0000 9995</code> - Insufficient funds</li>
                <li><code>4000 0000 0000 9987</code> - Lost card</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Home
          </Link>
          <Link 
            href="/pricing"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            View Pricing Page
          </Link>
        </div>

        {/* Status Information */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">✅ Completed</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stripe SDK installed</li>
                <li>• Environment variables configured</li>
                <li>• Checkout session API route</li>
                <li>• Webhook handler for events</li>
                <li>• Payment UI component</li>
                <li>• Success/Cancel pages</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-600">⚠️ Next Steps</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create actual Stripe products and prices</li>
                <li>• Set up webhook endpoints in Stripe dashboard</li>
                <li>• Configure real environment variables</li>
                <li>• Test with live payments</li>
                <li>• Implement user subscription management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
