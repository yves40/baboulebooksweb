
import Link from "next/link"

function Header() {
  return (
    <header className="header">
      <div className="header__div--left">
        <h3 className=" font-bold">Mise à jour</h3>
        <p>Rien à signaler depuis le début du mois.</p>
        <p>Les derniers livres achetés n'ont pas encore été rentrés dans la base.</p>
      </div>
    </header>
  )
}

export default Header