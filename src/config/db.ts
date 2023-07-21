import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'msmm@urici0', 
  database: 'ProyectoU', 
};

// Conexion a base de datos
const db = mysql.createPool(dbConfig);

export default db;
