"use client" 

import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className='text-3xl font-bold mt-6'>Administrer les livres</h1>
      <p className='my-4'>Vous accédez à la page d'administration des livres.
      Ici, vous pouvez ajouter, modifier ou supprimer des livres de la bibliothèque.
      Soyez prudents lors de la suppression de livres, car 
      ces actions ne sont pas réversibles.  
      </p>

      <ul className='pagemenu'>
        <li>Ajouter un livre</li>
        <li>Modifier un livre</li>
        <li>Supprimer un livre</li>
      </ul>
    </div>
  )
}
