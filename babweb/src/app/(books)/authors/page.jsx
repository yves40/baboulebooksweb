"use client"

import { useState, useRef, useEffect } from "react";
import { getTopAuthors } from "@/server/books/authors";

export default function page() {

  const version = "authors/page.jsx Dec 26 2025, 1.01";
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const results = useRef('results');
  const toplimit = 20;

  // -----------------------------------------------------------------------------
  // Get top authors list
  // -----------------------------------------------------------------------------
  const topAuthors = ( async () => {
    try {
      results.current.innerText = `Recherche...`;
      const rows = await getTopAuthors(toplimit);
      setSelectedAuthors(rows);
      if(rows.length === 0) {
        results.current.innerText = `Pas d\'auteurs sélectionnés !`;
        return;
      } 
      results.current.innerText = `Résultats - ${rows.length} auteurs`;
    }
    catch(error) {
      setSelectedAuthors([]);
      results.current.innerText = `Résultats : ${error.message}`;
    }
  })
  
  // Load data 
  useEffect( () => {
    topAuthors();
  }, [] );

  return (
    <div className="page__container">
      <h1 className='my-4 font-bold'>Top auteurs</h1>
      <p className=' my-5'>Voici les auteurs que vous avez le plus lu</p>
      <div className=' border-t-2 mt-6 pt-4 mx-4 text-gray-500'>
        <p className=' border-b-2 text-gray-500 pb-6 w-full' ref={results}>Top {toplimit}</p>
        <div className=' mb-24'>
          {selectedAuthors.length > 0 &&
            <ul className=' mt-4 mx-10 flex flex-col'>
              {selectedAuthors.map( (book, index) => (
                <li key={index} className=' mb-2 flex justify-start'>
                  <span>{book.bookcount} livres  écrits par : </span><span className=' font-bold ml-4'>{book.prenom} {book.nom}</span>
                </li> 
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  )
}
