import mysql from "mysql2/promise"; // Importing module to interact with sql database

// query: The SQL query string to be executed
// values: An array of values to be used with the query for parameterized queries
export async function query({ query, values = [] }) {

  // Establish Database connection by using the evn variable
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    post: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  // This section just deals with the utilization of the env configuration values

  try {
    const [results] = await dbconnection.execute(query, values); // Executing the passed query ( with or without values )
    dbconnection.end(); // End DB Connection after query is executed successfully
    return results; // Returns the result of the query as defined in the endpoint 
  } catch (error) {
    throw Error(error.message); // Throw a new error in case query was not executed successfully
  }
}

// Import query function from this db.js file in every api route (endpoint) that you create
// and pass the custom query and values that you require into this function for execution