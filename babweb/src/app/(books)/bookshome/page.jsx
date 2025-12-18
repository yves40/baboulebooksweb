"use client";

import { useEffect, useRef, useState } from 'react'
import { getBooksCount, getSelectedBooks } from '@/server/books/books';
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
  const [selectedbooks, setSelectedbooks] = useState([]);
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
  // Get book list based on criterias
  // -----------------------------------------------------------------------------
  const getBookslist = ( async () => {
    console.log(`Get books list with criterias: title=${booktitle}, author=${bookauthor}, editor=${bookeditor}`);
    const rows = await getSelectedBooks({title: booktitle, author: bookauthor, editor: bookeditor});
    console.log(rows);
    setSelectedbooks(rows);
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
  // Manage search boxes visibility
  // -----------------------------------------------------------------------------
  const toggleBookselector = ( () => {
    if (bookselector.current.hidden === true) {
      bookselector.current.hidden = false;
    } else {
      bookselector.current.hidden = true;
      setBooktitle('');
    }   
  })
  const toggleAuthorselector = ( () => {
    if (authorselector.current.hidden === true) {
      authorselector.current.hidden = false;
    } else {
      authorselector.current.hidden = true;
      setBookauthor('');
    }   
  })
  const toggleEditorselector = ( () => {
    if (editorselector.current.hidden === true) {
      editorselector.current.hidden = false;
    } else {
      editorselector.current.hidden = true;
      setBookeditor('');
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
    getBookslist();
  }, [booktitle]);
  useEffect( () => {
    getBookslist();
  }, [bookauthor]);
  useEffect( () => {
    getBookslist();
  }, [bookeditor]);


  return (
    <div className="page__container">
      <h1 className='my-4 font-bold'>Mes livres</h1>
      <div className='text-left mx-4'>
        <p>Bienvenue dans la section livres. Ici, vous pouvez interroger votre collection de livres.</p>
        <p>Faire des recherches par titre, auteur, éditeur</p>
        <p className=' my-3 underline'>Quelques statistiques sur vos livres dans la base :</p>
        <div>
          <ul className='' hidden ref={stats} > 
            <li className='gridcols511 mt-4'>
              <span className=' mx-4'>Nombre total de livres</span>
              <span className=' text-red-700 mx-4'>{bookscount}</span>
              <span className=' ml-4'><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" onClick={toggleBookselector}/></span>
            </li>
            <div ref={bookselector} hidden className=' mx-4 my-2'>
              <InputText className=' mx-4' componentid="booktitle" label="Rechercher par le titre" parentHandler={setBooktitle} timeout={2000}> </InputText>
            </div>

            <li  className='gridcols511 mt-4'>
              <span className=' mx-4 '>Nombre d'auteurs</span>
              <span className=' text-red-700 mx-4'>{authorscount}</span>
              <span className=' ml-4'><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" onClick={toggleAuthorselector}/></span>             
            </li>
            <div ref={authorselector} hidden className=' mx-4 my-2'>
              <InputText componentid="bookauthor" label="Rechercher par l' auteur"  parentHandler={setBookauthor} timeout={2000}> </InputText>
            </div>

            <li  className='gridcols511 mt-4'>
              <span className=' mx-4'>Nombre d'éditeurs</span>
              <span className=' text-red-700 mx-4'>{editorscount}</span>
              <span className=' ml-4'><img className='svgsmall-blue' src="svg/magnifying-glass-solid.svg" alt="" onClick={toggleEditorselector}/></span>
            </li>
            <div ref={editorselector} hidden className=' mx-4 my-2'>
              <InputText componentid="bookeditor" label="Rechercher par l'éditeur"  parentHandler={setBookeditor} timeout={2000}> </InputText>
            </div>
          </ul>
        </div>
      </div>
      <div className=' border-t-2 mt-6 pt-4 mx-4 text-gray-500'>
        <p className=' border-b-2 text-gray-500 pb-6 w-full'>Résultats</p>
        <div>
          {selectedbooks.length === 0 &&
            <p className=' mt-4'>Aucun livre trouvé avec les critères sélectionnés.</p>
          }
          {selectedbooks.length > 0 &&
            <ul className=' mt-4'>
              {selectedbooks.map( (book, index) => (
                <li key={index} className=' mb-2'>
                  <span className=' font-bold'>{book.bk_title}</span> - <span>{book.auth_fname} {book.auth_lname}</span> - <span><i>{book.ed_name}</i></span>
                </li> 
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  )
}
