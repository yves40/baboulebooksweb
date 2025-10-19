/*
  The middleware.js file must be located in the project root, 
  or inside src if applicable, so that it is located at the same level as pages or app.
*/
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {

  const sessionCheck = new URL(`${req.nextUrl.origin}/api/security/checkSession`, req.url);
  const authResponse = await fetch(sessionCheck, 
    {
      headers: {
        cookie: (await cookies()).toString()
      },
      cache: "force-cache",
      next: { tags: ["auth-session"]}
    }
  );
  const { authorized } = await authResponse.json();
  if (!authorized) {
    return NextResponse.redirect(`${req.nextUrl.origin}/signin`, req.url);
  }
  else {
    return NextResponse.next();
  }
}
// Filter dashboard and any underlying route
export const config = {
  // matcher: [ "/admin/:path*"]
  matcher: [ "/"]
}

