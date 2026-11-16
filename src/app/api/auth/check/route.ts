import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const auth = cookieStore.get('nhk_admin_auth');

  return NextResponse.json({
    authenticated: !!auth?.value,
  });
}

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete('nhk_admin_auth');
  return response;
}
