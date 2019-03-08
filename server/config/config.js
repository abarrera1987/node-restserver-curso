/** 
 * ======================================
 * Puerto
 * ======================================
 */

process.env.PORT = process.env.PORT || 3000;

/** 
 * ======================================
 * Entorno
 * ======================================
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/** 
 * ======================================
 * Base de datos
 * ======================================
 */

let urlDB;
require('dotenv').config();
if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = process.env.DB_URI;

}

process.env.URLDB = urlDB;