// pages/api/login.js

import { query } from "@/lib/db"; // Import query function from db.js file to establish connection and execute query for GET method

// Main handler function for GET request
export async function GET(request) {
  // Make sure the username and password parameters are passed in query from the frontend ( and not request body ) 
  const { searchParams } = new URL(request.url);  // Extract query parameters from the request URL
  const username = searchParams.get('username'); // Get the 'username' parameter
  const password = searchParams.get('password'); // Get the 'password' parametercls

  // Check if username and password are provided
  if (!username || !password) {
    // Return a new JSON string as an error response to the frontend
    return new Response(JSON.stringify('username and password are required!'), {
      status: 400, // Bad Request status
      headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
    });
  }

  try {
    // Query the database to find a matching user
    const users = await query({
      query: "SELECT * FROM user WHERE Firstname = ? AND Password = ?", // SQL query with placeholders
      values: [username, password], // Values to replace placeholders
    });

    // Check if no user was found
    if (users.length === 0) {
      // Return a new JSON string as an error response to the frontend
        return new Response(JSON.stringify('Invalid username or password'), {
            status: 401, // Unauthorized status
            headers: { 'Content-Type': 'application/json' }, // Set response type to plain text
        });
    }

    // If user is found, return success message as a JSON String
    return new Response(JSON.stringify('Login Successfull!'), {
      status: 200, // OK status denoting query was executed successfully
      headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
    });
  } catch (error) {
    console.error('Database query error:', error); // Log any errors for debugging

    // Return an error message if nothing else was returned
    return new Response(JSON.stringify('Internal server error'), {
      status: 500, // Internal Server Error status
      headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
    });
  }
}
