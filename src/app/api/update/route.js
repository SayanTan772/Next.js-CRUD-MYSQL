import { query } from "@/lib/db"; // Import query function from db.js file to establish connection and execute query for PUT method

// Main handler function for PUT request
export async function PUT(request) {

    const { Email, Password, confirmPass } = await request.json(); // Get the URL parameters passed to this api endpoint using request body

    // Check if any of the parameters are empty
    if(!Email || !Password || !confirmPass) {
        // If empty, return a new error response with a json string
        return new Response(JSON.stringify('All feilds are required!'), {
            status: 400, // bad request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });
    }

    // Check if the user exists
    const user = await query({
        query: "SELECT * FROM user WHERE Email = ?",
        values: [Email], // Email parameter passed in query placeholder
    });

    // If user is found, then
    if(user.length > 0) {
        // Check if passwords match or not
        if(Password === confirmPass) {
            // If passwords match, then execute query to set the new password based on the email
            const update = await query({
                query: "UPDATE user SET Password = ? WHERE Email = ?",
                values: [Password, Email], // Password & Email parameters are passed in query placeholder
            });

            const result = update.affectedRows; // Counts the number of rows affected in the table after executing the query
            // If result is greater than 0 then return a success message
            if(result) {
                // on success, return a new response with success message
                return new Response(JSON.stringify('Updated Successfully!'), {
                    status: 200, // Ok status
                    headers: { 'content-type': 'application/json' } // Set response type to JSON
                });
            }
        } else {
            // If password do not match return a new error response
            return new Response(JSON.stringify('Passwords do not match!'), {
                status: 400, // bad request
                headers: { 'content-type': 'application/json' }, // Set response type to JSON
            });            
        }
    } else {
        // If user not found, then return a new error response 
        return new Response(JSON.stringify('User does not exist!'), {
            status: 400, // bad request
            headers: { 'content-type': 'application/json' }, // Set response type to JSON
        });
    }

}