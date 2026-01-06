/*--------------------------------------------------------------------------------------
  Tout ce code est généré par npx
--------------------------------------------------------------------------------------*/
import "@/app/globals.css";
import "../../../public/css/sassglobals.css"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/context/authContext";
import { AppProvider } from "@/app/context/appContext";
import Providers from "@/app//providers";

export const metadata = {
  title: "BabouleBooks",
  description: "Petit outil de vérification pour baboule",
};

const version = "Auth Layout Jan 06 2026, 1.31";

export default function layout({ children }) {
  return (
        <Providers>
          <AppProvider>
            <AuthProvider>
              <Navbar></Navbar>
              <main>
                <h1 className=" text-sm font-bold">{version}</h1>
                {children}
              </main>
            </AuthProvider>
          </AppProvider>
        </Providers>
  );
}
 