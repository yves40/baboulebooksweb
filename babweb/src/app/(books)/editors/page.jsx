"use client"

import { useState, useRef, useEffect } from "react";
import { getTopEditors } from "@/server/books/editors";

export default function page() {

  const version = "editors/page.jsx Dec 26 2025, 1.01";
  const [selectedEditors, setselectedEditors] = useState([]);
  const results = useRef('results');
  const toplimit = 20;

  // -----------------------------------------------------------------------------
  // Get top editors list
  // -----------------------------------------------------------------------------
  const topEditors = ( async () => {
    try {
      results.current.innerText = `Recherche...`;
      const rows = await getTopEditors(toplimit);
      setselectedEditors(rows);
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
    topEditors();
  }, [] );

  
  return (
        <div className="page__container">
      <h1 className='my-4 font-bold'>Top éditeurs</h1>
      <p className=' my-5'>Voici les éditeurs que vous avez le plus lu</p>
      <div className=' border-t-2 mt-6 pt-4 mx-4 text-gray-500'>
        <p className=' border-b-2 text-gray-500 pb-6 w-full' ref={results}>Top {toplimit}</p>
        <div className=' mb-24'>
          {selectedEditors.length > 0 &&
            <ul className=' mt-4 mx-10 flex flex-col'>
              {selectedEditors.map( (book, index) => (
                <li key={index} className=' mb-2 flex justify-start'>
                  <span>{book.bookcount} livres vendus par : </span><span className=' font-bold ml-4'>{book.ed_name}</span>
                </li> 
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  )
}
