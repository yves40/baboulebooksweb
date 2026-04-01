"use client" 

import InputText from '@/components/InputText'
import { getSelectedBooks } from '@/server/books/books';
import { useEffect, useRef, useState, useContext } from 'react'
import { AuthContext } from '@/app/context/authContext';

export default function page() {
  
  const [booktitle, setBooktitle] = useState('');  
  const [bookauthor, setBookauthor] = useState('');
  const [bookeditor, setBookeditor] = useState('');
  const results = useRef('results');
  const [selectedbooks, setSelectedbooks] = useState([]);
  const authcontext = useContext(AuthContext);

  
  // -----------------------------------------------------------------------------
  // Get book list based on criterias
  // -----------------------------------------------------------------------------
  const getBookslist = ( async () => {
    const session = authcontext.getSession();
    try {
      results.current.innerText = `Recherche...`;
      const rows = await getSelectedBooks({title: booktitle, 
                                          author: bookauthor, 
                                          editor: bookeditor});
      setSelectedbooks(rows);
      if(rows.length === 0) {
        results.current.innerText = `Pas de livre sélectionné.`;
        return;
      } 
      results.current.innerText = `Résultats - ${rows.length} livre(s) trouvé(s)`;
    }
    catch(error) {
      setSelectedbooks([]);
      results.current.innerText = `Résultats : ${error.message}`;
    }
  })
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
    <div>
      <h1 className='text-3xl font-bold mt-6'>Administrer les livres</h1>
      <p className='my-4'>Vous accédez à la page d'administration des livres.
      Ici, vous pouvez ajouter, modifier ou supprimer des livres de la bibliothèque.
      Soyez prudents lors de la suppression de livres, car 
      ces actions ne sont pas réversibles.  
      </p>
      <InputText label="Filtrer par titre" name="booktitle" parentHandler={setBooktitle} timeout={2000}/>
      <InputText label="Filtrer par auteur" name="bookauthor" parentHandler={setBookauthor} timeout={2000}/>
      <InputText label="Filtrer par éditeur" name="bookeditor" parentHandler={setBookeditor} timeout={2000}/> 
      <div className=' border-t-2 mt-6 pt-4 mx-4 text-gray-500'>
        <p className=' border-b-2 text-gray-500 pb-6 w-full' ref={results}>Résultats</p>
        <div className=' mb-24'>
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
      <ul className='pagemenu'>
        <li>Ajouter un livre</li>
        <li>Modifier un livre</li>
        <li>Supprimer un livre</li>
      </ul>
    </div>
  )
}
