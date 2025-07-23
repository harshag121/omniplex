# Stripe Integration Setup Guide

This document explains how to set up and test the Stripe payment integration in the Omniplex application.

## 🔧 Setup Complete

The Stripe integration has been successfully implemented with the following components:

### 1. Environment Variables
- Added to `.env.local` and `.env.example`:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
  STRIPE_SECRET_KEY=sk_test_your_secret_key
  STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
  ```

### 2. API Routes
- **Checkout Session**: `/api/stripe/create-checkout-session`
  - Creates Stripe checkout sessions for subscriptions
  - Handles POST requests with `priceId` parameter
- **Webhook Handler**: `/api/stripe/webhook`
  - Processes Stripe webhook events
  - Handles subscription lifecycle events

### 3. UI Components
- **StripeCheckout Component**: `/src/components/StripeCheckout/`
  - Reusable payment button component
  - Integrates with Stripe.js for client-side processing
- **Payment Pages**:
  - Success page: `/payment/success`
  - Cancel page: `/payment/cancel`
  - Pricing page: `/pricing`
  - Demo page: `/stripe-demo`

### 4. Dependencies Installed
```json
{
  "@stripe/stripe-js": "^4.x.x",
  "stripe": "^17.x.x"
}
```

## 🧪 Testing the Integration

### Test Mode Setup
1. Visit the demo page: `http://localhost:3000/stripe-demo`
2. Click "Subscribe Now" on the Pro Plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date (e.g., `12/25`)
5. Any 3-digit CVC (e.g., `123`)
6. Complete the checkout process

### Additional Test Cards
- `4000 0000 0000 0002` - Card declined
- `4000 0000 0000 9995` - Insufficient funds
- `4000 0000 0000 9987` - Lost card

## 🔑 Production Setup

To move from test mode to production:

### 1. Stripe Dashboard Setup
1. Create a Stripe account at https://stripe.com
2. Create products and prices in the dashboard
3. Set up webhook endpoints pointing to your deployed app
4. Copy the live API keys

### 2. Environment Variables
Replace test keys with live keys:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Update Price IDs
Replace `price_test_pro_monthly` with actual price IDs from your Stripe dashboard.

### 4. Webhook Configuration
Set up webhook endpoint in Stripe dashboard:
- URL: `https://yourdomain.com/api/stripe/webhook`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

## 📝 Implementation Details

### Security Features
- Webhook signature verification
- Environment variable validation
- Error handling and logging
- HTTPS required for production

### Subscription Management
The webhook handler processes:
- Successful payments (`checkout.session.completed`)
- Subscription updates (`customer.subscription.updated`)
- Subscription cancellations (`customer.subscription.deleted`)

### User Experience
- Clean, responsive payment UI
- Loading states during processing
- Success/failure feedback
- Test mode indicators

## 🔄 Next Steps for Production

1. **Database Integration**: Store subscription status in your database
2. **User Authentication**: Link payments to user accounts
3. **Access Control**: Restrict features based on subscription status
4. **Email Notifications**: Send confirmation emails after payments
5. **Subscription Management**: Allow users to upgrade/downgrade plans
6. **Analytics**: Track payment success rates and revenue

## 🐛 Troubleshooting

### Common Issues
1. **Environment Variables**: Ensure all Stripe keys are properly set
2. **Webhook Endpoints**: Verify webhook URL is accessible and HTTPS
3. **CORS Issues**: Ensure proper CORS configuration for Stripe domains
4. **Test vs Live Mode**: Don't mix test and live API keys

### Development
- Use Stripe CLI for local webhook testing
- Monitor Stripe dashboard for payment events
- Check browser console for client-side errors
- Review server logs for API errors

## 📚 Documentation Links
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Stripe.js Reference](https://stripe.com/docs/js)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
