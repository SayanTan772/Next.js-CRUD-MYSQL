import { query } from "@/lib/db"; // Import query function from db.js file to establish connection and execute query for POST method

// Main handler function for POST request
export async function POST(request) {

    const { Firstname, Lastname, Phoneno, Email, Password } = await request.json(); // Get the URL parameters passed to this api endpoint using request body

    // Check if any of the parameters are empty
    if(!Firstname || !Lastname || !Phoneno || !Email || !Password) {
        // If empty, return a new error response with a json string
        return new Response(JSON.stringify('All fields are required!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    // Check if the phone number is valid or not
    if(Phoneno.length !== 10) {
        // Return a new error response with a json string
        return new Response(JSON.stringify('Invalid Mobile Number!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    // Check if the length of the password is less than 8 characters or not
    if(Password.length < 8) {
        // Return a new error response with a json string
        return new Response(JSON.stringify('Password must be atleast 8 characters!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    // Query to check if user already exists with the mail
    const checkUser = await query({
        query: "SELECT * FROM user WHERE Email = ?",
        values: [Email], // Email parameter passed in query placeholder
    });

    // Check if the user with matching mail is not found
    if(checkUser.length === 0) {
        // Query to insert values into table `user` 
        const updateUsers = await query({
            query: "INSERT INTO user (Firstname, Lastname, Phoneno, Email, Password) VALUES (?, ?, ?, ?, ?)",
            values: [Firstname, Lastname, Phoneno, Email, Password],
        });
    
        const result = updateUsers.affectedRows; // Counts the number of rows affected in the table after executing the query
        // If result is greater than 0 then return a success message
        if(result) {
            // on success, return a new response with success message
            return new Response(JSON.stringify('Registered Successfully!'), {
                status: 200, // OK status
                headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
            });
        }
    } else {
        // Return an error response if user with matching mail is found
        return new Response(JSON.stringify('User with this mail already exists !'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });
    }
}