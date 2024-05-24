import { query } from "@/lib/db";

export async function DELETE(request) {

    const { Email } = await request.json();

    if(!Email) {
        return new Response(JSON.stringify('All feilds are required!'), {
            status: 400, // bad request status
            headers: { 'Content-Type': 'application/json' }, // Return a json response
        });
    }

    const user = await query({
        query: "SELECT * FROM user WHERE Email = ?",
        values: [Email],
    });

    if(user.length > 0) {
        const deleteUser = await query({
            query: "DELETE FROM user WHERE Email = ?",
            values: [Email],
        });

        const result = deleteUser.affectedRows;
        if(result) {
            return new Response(JSON.stringify(`User with Email: ${Email} deleted successfully!`), {
                status: 200, 
                headers: { 'content-type': 'application/json' },
            });
        }
    } else {
        return new Response(JSON.stringify('User does not exist!'), {
            status: 400, // bad request
            headers: { 'content-type': 'application/json' },
        });
    }

}