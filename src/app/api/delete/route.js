import { query } from "@/lib/db"; // Import query function from db.js file to establish connection and execute query for DELETE method

// Main handler function for DELETE request
export async function DELETE(request) {

    const { Email } = await request.json(); // Get the Email parameter passed to this api endpoint using request body

    // Check if Email is empty, if so return a new response
    if(!Email) {
        // Return a new JSON string as an error response to the frontend
        return new Response(JSON.stringify('All feilds are required!'), {
            status: 400, // bad request status
            headers: { 'Content-Type': 'application/json' }, // Return a json response
        });
    }

    // Query to Check if user with the given Email exists
    const user = await query({
        query: "SELECT * FROM user WHERE Email = ?",
        values: [Email], // Pass Email parameter to the query placeholder
    });

    // Check if users exists
    if(user.length > 0) {
        const deleteUser = await query({
            query: "DELETE FROM user WHERE Email = ?", // Query to delete user from the table with the specified email
            values: [Email], // Pass Email parameter to the query placeholder
        });

        const result = deleteUser.affectedRows; // Counts the number of rows affected in the table after executing the query
        // If result is greater than 0 then return a success message
        if(result) {
            return new Response(JSON.stringify(`user deleted successfully!`), {
                status: 200, // Ok status
                headers: { 'content-type': 'application/json' }, // Set response type to JSON
            });
        }
    } else {
        // If the user is not found, then return an error response
        return new Response(JSON.stringify('User does not exist!'), {
            status: 400, // bad request status
            headers: { 'content-type': 'application/json' }, // Set response type to JSON
        });
    }

}