"use server";
/*
  The proxy.js file must be located in the project root, 
  or inside src if applicable, so that it is located at the same level as pages or app.
*/
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function proxy(req) {

  const logtracker = 'PROXY # ';

  console.log(`${logtracker} Proxy middleware invoked for ${req.nextUrl.pathname}`);

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
    return NextResponse.redirect(`${req.nextUrl.origin}/login`, req.url);
  }
  else {
    return NextResponse.next();
  }
}
// Filter dashboard and any underlying route
export const config = {
  matcher: ["/adminhome/:path*", "/adminusers/:path*", "/adminbooks/:path*"]
}


