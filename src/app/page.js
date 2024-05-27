'use client'; // using client side rendering

import styles from "./page.module.css";
import { useState, useEffect } from 'react'; // Importing hooks from react

export default function Login() {
  const [firstname, setFirstname] = useState(''); // State variable to store the firstname to be passed as parameter in the URL
  const [password, setPassword] = useState(); // State variable to store the password to be passed as parameter in the URL
  const [message, setMessage] = useState(''); // State variable to store the alert message
  const [show, setShow] = useState('none'); // State variable to toggle the display of success alert
  const [display, setDisplay] = useState('none'); // State variable to toggle the display of error alert

  // Function to handle state change of firstname and password variable
  const handleChange = (e) => {
    const { name, value } = e.target; // Using destructuring to extract the name and value attributes of the input tag

    if(name === "Firstname") {
      setFirstname(value); // Setting the state of the firstname variable to the value inputed by the user
    } else if(name === "Password") {
      setPassword(value); // Setting the state of the password variable to the value inputed by the user
    }
  }

  // Main handler function for making POST request to the api endpoint
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from submitting

    try {
      const response = await fetch(`/api/login?username=${firstname}&password=${password}`); // Call the api endpoint by passing the parameters within the query
      const result = await response.json(); // Get the JSON response

      // If the response status is 200 (ok status)
      if(response.ok) {
        setDisplay('none'); // hide the error alert
        setMessage(result); // Set the new message 
        setShow('flex'); // Show the success alert
      } else {
        // In case of an error
        setShow('none'); // hide the success alert
        setMessage(result); // Set the new message 
        setDisplay('flex'); // Show the error alert
      }
    } catch(error) {
      console.log("Error fetching data: ", error); // Throw an error in the console for debugging
    }
  }

  return (
    <main className={styles.main}>
      <div>
      <form className={styles.form} action="" method="GET" autoComplete="off">
        <h1 className={styles.h}>Log In</h1>
        {/* Alert box to show success message */}
        <div className={styles.success} style={{ display: `${show}` }}>{ message }</div>
        {/* Alert box to show error message */}
        <div className={styles.alert} style={{ display: `${display}` }}>{ message }</div>
        <label for="Firstname" className={styles.label}>Firstname</label><br />
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <input className={styles.input} type="text" name="Firstname" id="FirstName" value={firstname} onChange={handleChange} spellCheck="false" /><br />
        {/* Call the handleChange function to reflect changes in the state variable when the user types in the input field */}
        <label for="Password" className={styles.label}>Password</label><br />
        <input className={styles.input} type="password" name="Password" id="Password" value={password} onChange={handleChange} spellCheck="false" /><br />
        {/* Call the handleSubmit function with button onClick */}
        <div className={styles.div}><button className={styles.btn} onClick={handleSubmit}>Submit</button></div>
      </form>
    </div>
    </main>
  );
}
