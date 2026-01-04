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
/*--------------------------------------------------------------------------------------
  Section d'où tout se construit !
--------------------------------------------------------------------------------------*/
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="body__container">
        <h1 className=" text-2xl font-bold page__container">Root Layout</h1>
        {/* The redux store is available throughout the app, thanks to providers.jsx */}
        <Providers>
          <AppProvider>
            <AuthProvider>
              <main>
                {children}
              </main>
            </AuthProvider>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
 