/*--------------------------------------------------------------------------------------
  Tout ce code est généré par npx
--------------------------------------------------------------------------------------*/
import "@/app/globals.css";
import "../../public/css/sassglobals.css"
import NavbarBooks from "@/components/NavbarBooks";
import { AuthProvider } from "@/app/context/authContext";
import { AppProvider } from "@/app/context/appContext";
import Providers from "@/app/providers";

export const metadata = {
  title: "BabouleBooks",
  description: "Petit outil de vérification pour baboule",
};
const version = "Root Layout Jan 06 2026, 1.31";
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
              <main className="page__container">
                <h1 className=" text-sm font-bold text-black">{version}</h1>
                {children}
              </main>
            </AuthProvider>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
 