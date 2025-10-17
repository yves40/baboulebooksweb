/*
  Route Handlers allow you to create custom request handlers for a given 
  route using the Web Request and Response APIs.
  A route file allows you to create custom request handlers for a given route. The following HTTP methods 
  are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
*/
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  console.log('GET request to check user session');
  
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    if(!sessionId) {
      return NextResponse.json({authorized: false, status:401});
    }
    /*
      Here, check the user session on the DB
      await connectToDB();
      const session = await Session.findOne({ userId: sessionId });
      if(!session || session.expiresAt < new Date()) {
        return NextResponse.json({authorized: false, status:401});
      }
      const user = await User.findById(session.userId);
      if(!user) {
        return NextResponse.json({authorized: false, status:401});
      }
      return NextResponse.json({authorized: true, userId: user._id.toString()});
      */
      return NextResponse.json({authorized: true, status:200});
  }
  catch(error) {
    // console.log("Error while validating session", error);
    return NextResponse.json({authorized: false}, {status:500});
  }
}

