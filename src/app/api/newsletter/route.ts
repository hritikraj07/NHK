import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In a production backend, this integrates with Mailchimp, ConvertKit, Beehiiv, or Supabase
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to NHK Curated Dispatches.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription.' },
      { status: 500 }
    );
  }
}
