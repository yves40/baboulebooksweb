"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';

const modulename = "serverBooks # ";
const Version = "editors.js Dec 17 2025, 1.00";

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
        console.log(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre d\'éditeurs');
    }   
}
