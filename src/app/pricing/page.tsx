import StripeCheckout from '@/components/StripeCheckout/StripeCheckout';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Upgrade to unlock premium features and unlimited access.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Free</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for getting started</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <button className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                Current Plan
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Basic chat features</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Limited searches per day</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Community support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pro</h3>
              <p className="mt-4 text-sm text-gray-500">Most popular choice for professionals</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$10</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <div className="mt-8">
                <StripeCheckout 
                  priceId="price_test_pro_monthly" 
                  productName="Pro Plan" 
                  price="$10" 
                />
              </div>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Unlimited chat and searches</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Advanced AI features</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Priority support</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Export conversations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-500">Advanced features for teams</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$50</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <button className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">
                Contact Sales
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Everything in Pro</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Team collaboration</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Custom integrations</span>
                </li>
                <li className="flex space-x-3">
                  <span className="text-sm text-gray-500">• Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
