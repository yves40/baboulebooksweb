/*--------------------------------------------------------------------------------------
  Tout ce code est généré par npx
--------------------------------------------------------------------------------------*/
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; /* Permet de centraliser les constantes, les classe css, etc. */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/context/authContext";
import { AppProvider } from "./context/appContext";
import Providers from "./providers";

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
export default function RootLayout({ children }) {
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
            <Footer></Footer>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
 