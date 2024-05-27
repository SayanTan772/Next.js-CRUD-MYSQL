'use client'; // using client side rendering

import styles from "./page.module.css";
import { useState, useEffect } from 'react'; // Importing hooks from react

export default function Register() {
    const [mssg, setMssg] = useState(''); // State variable to store the alert message
    const [show, setShow] = useState('none'); // State variable to toggle the display of success alert
    const [display, setDisplay] = useState('none'); // State variable to toggle the display of error alert

    // Setting an object to initialize the formData state object
    const initialFormData = {
        Firstname: '',
        Lastname: '',
        Phoneno: '',
        Email: '',
        Password: ''
      };
    
    const [formData, setFormData] = useState(initialFormData); // State object to store the formData 

    // Function to handle state change of formData object
    const handleChange = (e) => {
        // We create a new object that contains all the properties and values of the prevData object. This ensures that we are not mutating the existing state but creating a new copy with the updated values
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value })); // This dynamically sets a property on the object based on the name attribute of the event target (e.target)
    };

    // Main handler function for making POST request to the api endpoint
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the form from submitting
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST', // Specify request method as POST
                headers: {
                    'Content-Type': 'application/json' // This specifies that the data to be sent is in JSON format
                },
                body: JSON.stringify(formData) // Sending the formData through the request body as a JSON string
            });
    
            const result = await response.json(); // Get the JSON response


            // If the response status is 200 (ok status)
            if(response.ok) {
                setDisplay('none'); // hide the error alert
                setMssg(result); // Set the new message 
                setShow('flex'); // Show the success alert
            } else {
                // In case of an error
                setShow('none'); // hide the success alert
                setMssg(result); // Set the new message 
                setDisplay('flex'); // Show the error alert
            }
        } catch (error) {
            console.error('Error submitting entry:', error); // Throw an error in the console for debugging
        }
      };

    return (
        <main className={styles.main}>
        {/* Call the handleSubmit function on submitting the form */}
        <form className={styles.form} action="" method="POST" onSubmit={handleSubmit} autoComplete="off">
        <h1 className={styles.h}>Sign Up</h1>
        {/* Alert box to show success message */}
        <div className={styles.success} style={{ display: `${show}` }}>{ mssg }</div>
        {/* Alert box to show error message */}
        <div className={styles.alert} style={{ display: `${display}` }}>{ mssg }</div>
        <label className={styles.label} for="firstname">firstname:</label>
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input type="text" className={styles.input} id="Firstname" name="Firstname" value={formData.Firstname} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="lastname">lastname:</label>
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input type="text" className={styles.input} id="Lastname" name="Lastname" value={formData.Lastname} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="Phoneno">Phoneno:</label>
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input type="number" className={styles.input} id="Phoneno" name="Phoneno" value={formData.Phoneno} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="Email">Email:</label>
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input type="email" className={styles.input} id="Email" name="Email" value={formData.Email} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="password">Password:</label>
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input type="password" className={styles.input} id="Password" name="Password" value={formData.Password} onChange={handleChange} spellCheck="false" /><br />
        <div className={styles.div}><button className={styles.btn} type="submit">Submit</button></div>
        </form>
        </main>
    );
}