import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
        firebase: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'configured' : 'not configured',
        openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured',
      }
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: 'Health check failed' 
      }, 
      { status: 500 }
    );
  }
}
