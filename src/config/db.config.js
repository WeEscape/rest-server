import mysql from 'mysql2';

const mysqlConfig = mysql.createConnection({
  dbConnect: {
    host: '***************.rds.amazonaws.com',
    user: 'username',
    password: 'password',
    port: 3306,
    database: 'dbname',
    connectionLimit: 10,
  },
});

export default mysqlConfig;
