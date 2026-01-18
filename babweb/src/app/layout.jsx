/*--------------------------------------------------------------------------------------
  Tout ce code est généré par npx
--------------------------------------------------------------------------------------*/
import "@/app/globals.css";
import { AuthProvider } from "@/app/context/authContext";
import { AppProvider } from "@/app/context/appContext";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "BabouleBooks",
  description: "Petit outil de vérification pour baboule",
};
const version = "Root Layout Jan 18 2026, 1.32";
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
              <Navbar />
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
 