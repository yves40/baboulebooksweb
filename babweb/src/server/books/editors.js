"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';
import Logger from '@/classes/logger';

const modulename = "serverBooks # ";
const Version = "editors.js Dec 26 2025, 1.01";
const logger = new Logger();

// -----------------------------------------------------------------------------------------
// Search editors count
// -----------------------------------------------------------------------------------------
export async function getEditorsCount() {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const result = await sqlh.Select('select count(*) as editorscount from babouledb.editors', 
                                        null, 
                                        conn);
        sqlh.commitTransaction(conn);
        if(result.length > 0) {
            return result[0].editorscount;
        }
        else {
            throw new AppError('Aucun éditeur trouvé');
        }   
    }
    catch(error) {
        logger.error(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre d\'éditeurs');
    }   
}
// -----------------------------------------------------------------------------------------
// Top authors
// -----------------------------------------------------------------------------------------
export async function getTopEditors(limit) {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const result = await sqlh.Select('select count(b.bk_id) bookcount , e.ed_name \
                        from babouledb.books b, babouledb.editors e \
                        where b.bk_editor = e.ed_id  \
                        group by e.ed_name \
                        order by bookcount desc , e.ed_name asc limit ?', 
                limit, 
                conn);
        sqlh.commitTransaction(conn);
        if(result.length > 0) {
            return result;
        }
        else {
            throw new AppError('Pas de top éditeurs ! Désolé');
        }   
    }
    catch(error) {
        logger.error(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération des éditeurs les plus lus');
    }
}

