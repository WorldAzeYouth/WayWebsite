import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminCookie = request.cookies.get('admin_uid')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/dashboard') && !adminCookie) {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  if (pathname === '/admin' && adminCookie) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};