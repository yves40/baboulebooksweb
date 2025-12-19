/*
  Route Handlers allow you to create custom request handlers for a given 
  route using the Web Request and Response APIs.
  A route file allows you to create custom request handlers for a given route. The following HTTP methods 
  are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
*/
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Logger from "@/classes/logger";


export async function GET() {
  const logger = new Logger();
  logger.info('GET request to check user session');
  try {
    const cookieStore = await cookies();
    const userid = cookieStore.get("userid")?.value;
    logger.info(`******************* ${userid}`);
    if(!userid) {
      return NextResponse.json({authorized: false, status:401});
    }
    /**
     * TODO
     * Check the user session on the DB
     */

    return NextResponse.json({authorized: true, status:200});
  }
  catch(error) {
    logger.error(`Error while validating session: ${error}`);
    return NextResponse.json({authorized: false, status:500});
  }
}

export async function POST() {
  const logger = new Logger();
  logger.info('POST request to check user session');
  try {
    const cookieStore = await cookies();
    const userid = cookieStore.get("userid")?.value;
    logger.info(`******************* ${userid}`);
    if(!userid) {
      return NextResponse.json({authorized: false, status:401});
    }
    /**
     * TODO
     * Check the user session on the DB
     */

    return NextResponse.json({authorized: true, status:200});
  }
  catch(error) {
    logger.error(`Error while validating session: ${error}`);
    return NextResponse.json({authorized: false, status:500});
  }
}
