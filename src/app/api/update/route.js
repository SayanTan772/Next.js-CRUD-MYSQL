import { query } from "@/lib/db";

export async function PUT(request) {

    const { Email, Password, confirmPass } = await request.json();

    if(!Email || !Password || !confirmPass) {
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
        if(Password === confirmPass) {
            const update = await query({
                query: "UPDATE user SET Password = ? WHERE Email = ?",
                values: [Password, Email],
            });

            const result = update.affectedRows;
            if(result) {
                return new Response(JSON.stringify('Updated Successfully!'), {
                    status: 200,
                    headers: { 'content-type': 'application/json' }
                });
            }
        } else {
            return new Response(JSON.stringify('Passwords do not match!'), {
                status: 400, // bad request
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