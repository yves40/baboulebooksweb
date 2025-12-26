import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
          <Header></Header>
          <h1 className="text-4xl mb-6">Baboule's Books</h1>
          <p className=" mx-auto p-6 text-white bg-gray-700 text-center border-0 rounded-2xl">
            Je cherche un livre, car je suis en vadrouille et je ne sais pas si je l'ai déjà. 
            Cela peut vous sembler idiot mais j'en possède 1600 et je doute parfois d'en avoir déjà lu un !
            Alors cette petite application me permet rapidement de lever un doute.
            Et de ne pas racheter un livre que j'ai déjà, ce qui m'est arrivé !
          </p>
    </div>
  );
}
