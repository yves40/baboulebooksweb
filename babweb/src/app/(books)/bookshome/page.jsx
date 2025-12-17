"use client";

import { useEffect, useState } from 'react'
import { getBooksCount } from '@/server/books/books';
import { getAuthorsCount } from '@/server/books/authors';
import { getEditorsCount } from '@/server/books/editors';

export default function page() {

  const version = "bookshome/page.jsx Dec 17 2025, 1.00";
  const [bookscount, setBookscount] = useState(0);
  const [authorscount, setAuthorscount] = useState(0);
  const [editorscount, setEditorscount] = useState(0);

  console.log(`${version} render`);

  // ---------------------------------------------------------------------------------
  // Get books count from server
  // -----------------------------------------------------------------------------
  const getbooks = ( async () => {
    try {
      const count = await getBooksCount();
      setBookscount(count);
    }
    catch(error) {
      console.log(`Error in getbooks: ${error}`);
    } 
  })
  // ---------------------------------------------------------------------------------
  // Get authors count from server
  // -----------------------------------------------------------------------------
  const getauthors = ( async () => {
    try {
      const count = await getAuthorsCount();
      setAuthorscount(count);
    }
    catch(error) {
      console.log(`Error in getauthors: ${error}`);
    } 
  })
  // ---------------------------------------------------------------------------------
  // Get editors count from server
  // -----------------------------------------------------------------------------
  const geteditors = ( async () => {
    try {
      const count = await getEditorsCount();
      setEditorscount(count);
    }
    catch(error) {
      console.log(`Error in geteditors: ${error}`);
    } 
  })

  // On page load
  useEffect( () => {
    getbooks();
    getauthors();
    geteditors();
  }, []);


  return (
    <div className="page__container">
      <h1 className='my-4 font-bold'>Mes livres</h1>
      <div className='text-left mx-4'>
        <p>Bienvenue dans la section livres. Ici, vous pouvez interroger votre collection de livres.</p>
        <p>Faire des recherches par titre, auteur, éditeur</p>
        <p className=' my-3 underline'>Quelques statistiques sur vos livres :</p>
        <ul className=' '>
          <li>Nombre total de livres : {bookscount}</li>
          <li>Nombre d'auteurs       : {authorscount}</li>
          <li>Nombre d'éditeurs      : {editorscount}</li>
        </ul>
      </div>
    </div>
  )
}
