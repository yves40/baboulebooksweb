/*--------------------------------------------------------------------------------------
  Tout ce code est généré par npx
--------------------------------------------------------------------------------------*/
import "@/app/globals.css";
import "../../../../public/css/sassglobals.css"
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/app/context/authContext";
import { AppProvider } from "@/app/context/appContext";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BabouleBooks",
  description: "Petit outil de vérification pour baboule",
};
/*--------------------------------------------------------------------------------------
  Section d'où tout se construit !
--------------------------------------------------------------------------------------*/
export default function layout({ children }) {
  return (
    <html lang="fr">
      <body className="body__container">
        {/* The redux store is available throughout the app, thanks to providers.jsx */}
        <Providers>
          <AppProvider>
            <AuthProvider>
              <Navbar></Navbar>
              <main className="page__container">
                {children}
              </main>
            </AuthProvider>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
 