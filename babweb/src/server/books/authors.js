"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';

const modulename = "serverAuthors # ";
const Version = "authors.js Dec 17 2025, 1.00";

// -----------------------------------------------------------------------------------------
// Search authors count
// -----------------------------------------------------------------------------------------
export async function getAuthorsCount() {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const result = await sqlh.Select('select count(*) as authorscount from babouledb.authors', 
                                        null, 
                                        conn);
        sqlh.commitTransaction(conn);
        if(result.length > 0) {
            return result[0].authorscount;
        }
        else {
            throw new AppError('Aucun auteur trouvé');
        }   
    }
    catch(error) {
        console.log(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre d\'auteurs');
    }   
}
