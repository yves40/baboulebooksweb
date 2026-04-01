"use client"

import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className='text-3xl font-bold mt-6'>Administrer les utilisateurs</h1>
      <p className='my-4'>
      Ici, vous pouvez ajouter, modifier ou supprimer des utilisateurs. 
      Soyez prudents lors de la suppression d'utilisateurs, car ces actions ne sont pas réversibles.
      Evitez de vous supprimer vous même !!
      </p>

      <ul className='pagemenu'>
        <li>Ajouter un utilisateur</li>
        <li>Modifier un utilisateur</li>
        <li>Supprimer un utilisateur</li>
      </ul>
    </div>
  )
}
