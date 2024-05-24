// pages/api/login.js

import { query } from "@/lib/db";

// Main handler function for GET requests
export async function GET(request) {
  const { searchParams } = new URL(request.url);  // Extract query parameters from the request URL
  const username = searchParams.get('username'); // Get the 'username' parameter
  const password = searchParams.get('password'); // Get the 'password' parametercls

  // Check if username and password are provided
  if (!username || !password) {
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
        return new Response(JSON.stringify('Invalid username or password'), {
            status: 401, // Unauthorized status
            headers: { 'Content-Type': 'application/json' }, // Set response type to plain text
        });
    }

    // If user is found, return success message
    return new Response(JSON.stringify('Login Successfull!'), {
      status: 200, // OK status
      headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
    });
  } catch (error) {
    console.error('Database query error:', error); // Log any errors for debugging

    // Return a generic error message
    return new Response(JSON.stringify('Internal server error'), {
      status: 500, // Internal Server Error status
      headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
    });
  }
}
