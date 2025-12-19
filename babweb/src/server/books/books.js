"use server"

import sqlHelper from '@/classes/sqlHelper';
import AppError from '@/classes/customError';

const modulename = "serverBooks # ";
const Version = "books.js Dec 19 2025, 1.02";

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
    // 1st, normalize user inputs
    let title = criteria.title ? criteria.title.trim().toLowerCase() : '';
    // title = title.charAt(0).toUpperCase() + title.slice(1);
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
    /**
     * Determine search level
     * 0 : no criteria
     * 1 : title only
     * 2 : author only
     * 3 : title + author
     * 4 : editor only
     * 5 : title + editor
     * 6 : author + editor
     * 7 : title + author + editor
     */
    let searchlevel = 0
    if(title.length > 0) {
        searchlevel = 1;
    }
    if(author.length > 0) {
        searchlevel += 2;
    }
    if(editor.length > 0) {
        searchlevel += 4;
    }
    const sqlh = new sqlHelper();
    switch(searchlevel) {
        case 0:
            return [];
        case 1:
            return await searchBooksByTitle(title);
        case 2:
            return await searchBooksByAuthor(author);
        case 3:
            return await searchBooksByTitleAuthor(title, author);
        case 4:
            return await searchBooksByEditor(editor);
        case 5:
            return await searchBooksByTitleEditor(title, editor);
        case 6:
            return await searchBooksByAuthorEditor(author, editor);
        default:
            throw new AppError(`Recherche sur 3 critères non encore implémentée`);
    }
    // ----------------------------------------
    // 1 criteria on book title
    // ----------------------------------------
    async function searchBooksByTitle(title) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where bk_title like ? and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${title}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
    // ----------------------------------------
    // 1 criteria on author last name
    // ----------------------------------------
    async function searchBooksByAuthor(authorlastname) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where a.auth_lname like ? and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${authorlastname}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
    // ----------------------------------------
    // 1 criteria on editor name
    // ----------------------------------------
    async function searchBooksByEditor(editorname) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where e.ed_name like ? and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${editorname}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
    // ----------------------------------------
    // 2 criterias on title and author
    // ----------------------------------------
    async function searchBooksByTitleAuthor(title, authname) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where b.bk_title like ? and a.auth_lname like ?\
                and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${title}%`, `%${authname}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
    // ----------------------------------------
    // 2 criterias on title and editor
    // ----------------------------------------
    async function searchBooksByTitleEditor(title, editorname) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where b.bk_title like ? and e.ed_name like ?\
                and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${title}%`, `%${editorname}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
    // ----------------------------------------
    // 2 criterias on title and editor
    // ----------------------------------------
    async function searchBooksByAuthorEditor(authorname, editorname) {
        let rows = [];
        const conn = await sqlh.startTransactionRO();
        rows = await sqlh.Select('select b.bk_title, a.auth_lname, a.auth_fname, e.ed_name from books b, authors a, editors e \
                where a.auth_lname like ? and e.ed_name like ?\
                and b.bk_author = a.auth_id and b.bk_editor = e.ed_id',
                    [`%${authorname}%`, `%${editorname}%`],
                    conn);
        sqlh.commitTransaction(conn);
        return rows;
    }
}
