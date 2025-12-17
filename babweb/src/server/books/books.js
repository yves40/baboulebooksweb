"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';

const modulename = "serverBooks # ";
const Version = "books.js Dec 17 2025, 1.00";

// -----------------------------------------------------------------------------------------
// Search books count
// -----------------------------------------------------------------------------------------
export async function getBooksCount() {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const result = await sqlh.Select('select count(*) as bookscount from babouledb.books', 
                                        null, 
                                        conn);
        sqlh.commitTransaction(conn);
        if(result.length > 0) {
            return result[0].bookscount;
        }
        else {
            throw new AppError('Aucun livre trouvé');
        }   
    }
    catch(error) {
        console.log(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre de livres');
    }   
}
