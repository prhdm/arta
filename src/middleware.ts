import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // اگر درخواست برای صفحه تعمیرات باشد، اجازه عبور می‌دهیم
  if (request.nextUrl.pathname === '/maintenance') {
    return NextResponse.next()
  }

  // برای تمام درخواست‌های دیگر، به صفحه تعمیرات هدایت می‌کنیم
  return NextResponse.redirect(new URL('/maintenance', request.url))
}

// تنظیم مسیرهایی که middleware باید روی آنها اجرا شود
export const config = {
  matcher: [
    /*
     * تمام مسیرها به جز:
     * - api (مسیرهای API)
     * - _next/static (فایل‌های استاتیک)
     * - _next/image (تصاویر)
     * - favicon.ico (آیکون سایت)
     * - maintenance (صفحه تعمیرات)
     * - fonts (فایل‌های فونت)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|maintenance|fonts).*)',
  ],
} 