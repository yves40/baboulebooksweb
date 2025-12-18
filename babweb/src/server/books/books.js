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
export async function getSelectedBooks(criteria) {
    if(!criteria) {
        throw new AppError('No criteria provided');
    }
    if(typeof criteria !== 'object') {
        throw new AppError('Invalid criteria type');
    }
    console.log(`Now search for books : User input criterias : ${JSON.stringify(criteria)}`);
    // 1st, normalize user inputs
    let title = criteria.title ? criteria.title.trim().toLowerCase() : '';
    title = title.charAt(0).toUpperCase() + title.slice(1);
    let author = criteria.author ? criteria.author.trim().toUpperCase() : '';
    let editor = criteria.editor ? criteria.editor.trim().toUpperCase() : '';
    console.log(`Now search for books with these criterias : ${title} : ${author} : ${editor}`);
    /**
     // Build the query
     * SELECT * FROM `books` WHERE bk_title like '%AL%';
     * SELECT * FROM books b, authors a WHERE b.bk_title like '%AL%' and a.auth_lname like '%AU%' and b.bk_author = a.auth_id;
     * SELECT b.bk_title, a.auth_lname, e.ed_name FROM books b, authors a, editors e WHERE b.bk_title like '%AL%' and a.auth_lname like '%AU%' 
     *          and b.bk_author = a.auth_id and b.bk_editor = e.ed_id;
     */
    const sqlh = new sqlHelper();
    let titlecondition = '';
    let authorcondition = '';
    let editorcondition = '';
    if(title.length > 0) {
        titlecondition = ` bk_title like '%?%' `;
    }
    if(author.length > 0) {
        authorcondition = ` auth_lname like '%?%' `;
    }
    if(editor.length > 0) {
        editorcondition = ` ed_name like '%?%' `;
    }
    // Simple 1 criteria on book title
    let rows = [];
    if(titlecondition.length > 0) {
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where bk_title like ? and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${title}%`],
                    conn);
        sqlh.commitTransaction(conn);
    }
    return rows;
}
