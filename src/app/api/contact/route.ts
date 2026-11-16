import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // In production, this can forward via Resend, Sendgrid, or Postmark
    return NextResponse.json({
      success: true,
      message: 'Your note has been received by the NHK editorial desk. We will respond within 24-48 hours.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
