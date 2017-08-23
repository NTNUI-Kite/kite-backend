import mysql from 'mysql';
import dbConfig from '../config/dbConfig';
let connection=mysql.createPool(dbConfig);

export default connection;
