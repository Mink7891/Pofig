import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const response = NextResponse.next();

  let colorTheme = request.cookies.get('colorTheme');
  // console.log(colorTheme)
  if (!colorTheme) {
    response.cookies.set('colorTheme', 'black')
  }

  response.headers.set("custom", "answer")

  return response

  /*
  if (request.nextUrl.pathname ==="/cringe") {
    // rewrite saves url same url, redirect changes it
    return NextResponse.redirect(new URL("/", request.url));
  }
  // return NextResponse.redirect(new URL("/", request.url));*/
}

// export const config = {
//   matcher: '/cringe',
// }