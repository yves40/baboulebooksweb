import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl">Baboule</h1>
        <p className=" p-6 text-white bg-red-800  border-0 rounded-2xl">
          Je cherche un livre, car je suis en vadrouille et je ne sais pas si je l'ai déjà. 
          Cela peut vous sembler idiot mais j'en possède 1600 et je doute parfois d'en avoir déjà lu un !
          Alors cette petite application me permet rapidement de lever un doute.
          Et de ne pas reacheter un livre que j'ai déjà, ce qui m'est arrivé !
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
