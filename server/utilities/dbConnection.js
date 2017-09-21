import mysql from 'mysql';
import dbConfig from '../config/DBConfig';

const connection = mysql.createPool(dbConfig);

export default connection;
