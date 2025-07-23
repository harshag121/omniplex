import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // For demo purposes, if using test price ID, create a product on the fly
    let actualPriceId = priceId;
    
    if (priceId === 'price_test_pro_monthly') {
      try {
        // Create a test product
        const product = await stripe.products.create({
          name: 'Pro Plan',
          description: 'Omniplex Pro Plan - Unlimited access to premium features',
        });

        // Create a test price
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: 1000, // $10.00 in cents
          currency: 'usd',
          recurring: {
            interval: 'month',
          },
        });

        actualPriceId = price.id;
        console.log('Created test product and price:', actualPriceId);
      } catch (productError) {
        console.error('Error creating test product:', productError);
        return NextResponse.json(
          { error: 'Failed to create test product' },
          { status: 500 }
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: actualPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/payment/cancel`,
      customer_email: undefined, // You can add customer email here if available
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
