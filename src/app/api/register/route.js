import { query } from "@/lib/db";

export async function POST(request) {

    const { Firstname, Lastname, Phoneno, Email, Password } = await request.json();

    if(!Firstname || !Lastname || !Phoneno || !Email || !Password) {
        return new Response(JSON.stringify('All fields are required!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    if(Phoneno.length !== 10) {
        return new Response(JSON.stringify('Invalid Mobile Number!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    if(Password.length < 8) {
        return new Response(JSON.stringify('Password must be atleast 8 characters!'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });   
    }

    const checkUser = await query({
        query: "SELECT * FROM user WHERE Email = ?",
        values: [Email],
    });

    if(checkUser.length === 0) {
        const updateUsers = await query({
            query: "INSERT INTO user (Firstname, Lastname, Phoneno, Email, Password) VALUES (?, ?, ?, ?, ?)",
            values: [Firstname, Lastname, Phoneno, Email, Password],
        });
    
        const result = updateUsers.affectedRows;
        if(result) {
            return new Response(JSON.stringify('Registered Successfully!'), {
                status: 200, // OK status
                headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
            });
        }
    } else {
        return new Response(JSON.stringify('User with this mail already exists !'), {
            status: 400, // Bad Request status
            headers: { 'Content-Type': 'application/json' }, // Set response type to JSON
        });
    }
}