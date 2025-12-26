"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';
import Logger from '@/classes/logger';

const modulename = "serverAuthors # ";
const Version = "authors.js Dec 17 2025, 1.00";
const logger = new Logger();

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
        logger.error(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre d\'auteurs');
    }   
}
// -----------------------------------------------------------------------------------------
// Top authors
// -----------------------------------------------------------------------------------------
export async function getTopAuthors(limit) {
    try {
        console.log(`Get top authors. Limit set to ${limit}`);
        
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const result = await sqlh.Select('select count(b.bk_id) bookcount , a.auth_lname nom, a.auth_fname prenom\
                    from babouledb.books b, babouledb.authors a\
                    where b.bk_author = a.auth_id \
                    group by a.auth_lname, a.auth_fname \
                    order by bookcount desc , a.auth_lname asc limit ?', 
            limit, 
            conn);
        sqlh.commitTransaction(conn);
        if(result.length > 0) {
            return result;
        }
        else {
            throw new AppError('Pas de top auteurs ! Désolé');
        }   
    }
    catch(error) {
        logger.error(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération des auteurs les plus lus');
    }   
}
