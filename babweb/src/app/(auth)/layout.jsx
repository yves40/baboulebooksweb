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
export default function layout({ children }) {
  return (
        <Providers>
          <AppProvider>
            <AuthProvider>
              <Navbar></Navbar>
              <main className="page__container">
                <h1 className=" text-2xl font-bold page__container">Auth Layout</h1>
                {children}
              </main>
            </AuthProvider>
          </AppProvider>
        </Providers>
  );
}
 