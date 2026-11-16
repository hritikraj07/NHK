import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'nhk2026';

    if (password === expectedPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
      });

      // Set auth cookie
      response.cookies.set({
        name: 'nhk_admin_auth',
        value: 'authenticated_session_' + Date.now(),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect administrator password.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication error.' },
      { status: 500 }
    );
  }
}
