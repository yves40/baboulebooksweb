"use client";

import { useEffect, useRef, useState } from 'react'
import { getBooksCount } from '@/server/books/books';
import { getAuthorsCount } from '@/server/books/authors';
import { getEditorsCount } from '@/server/books/editors';
import InputText from '@/components/InputText';

export default function page() {

  const version = "bookshome/page.jsx Dec 17 2025, 1.01";
  const [bookscount, setBookscount] = useState(0);
  const [authorscount, setAuthorscount] = useState(0);
  const [editorscount, setEditorscount] = useState(0);
  const [booktitle, setBooktitle] = useState('');
  const [bookauthor, setBookauthor] = useState('');
  const [bookeditor, setBookeditor] = useState('');
  const stats = useRef('stats');
  const bookselector = useRef('bookselector');
  const authorselector = useRef('authorselector');
  const editorselector = useRef('editorselector');

  // -----------------------------------------------------------------------------
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
  // -----------------------------------------------------------------------------
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
  // -----------------------------------------------------------------------------
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

  // -----------------------------------------------------------------------------
  // On page load
  // -----------------------------------------------------------------------------
  useEffect( () => {
    getbooks();
    getauthors();
    geteditors();
    stats.current.hidden = false;
  }, []);

  // -----------------------------------------------------------------------------
  // Track search criterias updates
  // -----------------------------------------------------------------------------
  useEffect( () => {
    console.log(`Title search update, now find: =================== ${booktitle}`);
  }, [booktitle]);
  useEffect( () => {
    console.log(`Author search update, now find: =================== ${bookauthor}`);
  }, [bookauthor]);
  useEffect( () => {
    console.log(`Editor search update, now find: =================== ${bookeditor}`);
  }, [bookeditor]);


  return (
    <div className="page__container">
      <h1 className='my-4 font-bold'>Mes livres</h1>
      <div className='text-left mx-4'>
        <p>Bienvenue dans la section livres. Ici, vous pouvez interroger votre collection de livres.</p>
        <p>Faire des recherches par titre, auteur, éditeur</p>
        <p className=' my-3 underline'>Quelques statistiques sur vos livres dans la base :</p>
        <ul className=' max-w-1/2 m-6' hidden ref={stats}>
          <li className='flex justify-end'>
            <span className=' mx-4'>Nombre total de livres</span>
            <span className='text-red-700 mx-4'>{bookscount}</span>
            <span ref={bookselector}><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" /></span>
          </li>
          <InputText className=' mx-4' componentid="booktitle" label="Rechercher un titre"  parentHandler={setBooktitle} timeout={2000}> </InputText>
          <li  className='flex justify-end'>
            <span className=' mx-4'>Nombre d'auteurs</span>
            <span className='text-red-700 mx-4'>{authorscount}</span>
            <span ref={authorselector}><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" /></span>             
          </li>
          <InputText componentid="booktitle" label="Rechercher un auteur"  parentHandler={setBookauthor} timeout={2000}> </InputText>
          <li  className='flex justify-end'>
            <span className=' mx-4'>Nombre d'éditeurs</span>
            <span className='text-red-700 mx-4'>{editorscount}</span>
            <span ref={editorselector}><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" /></span>
          </li>
          <InputText componentid="booktitle" label="Rechercher un éditeur"  parentHandler={setBookeditor} timeout={2000}> </InputText>
        </ul>
      </div>
    </div>
  )
}
