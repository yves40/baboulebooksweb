/**
 * Why this file ? 
 * 
 * Creating a context at the root of your application in Next.js will cause an error in server components.
 * To handle this create a client Component called Providers that wraps the third-party providers, AppProvider and DbProvider. 
 * We mark this component as a Client Component by using the "use client" directive.
 * Now, you can import and render <Providers /> directly within your root layout:
 */
'use client';

import { AppProvider } from "./appContext";
import { DbProvider } from "./dbContext";

export function Providers({ children }) {
  return (
    <AppProvider>
      <DbProvider>{children}</DbProvider>
    </AppProvider>
  );
}