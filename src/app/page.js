'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Login() {
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState();
  const [message, setMessage] = useState(''); // To show the error and success messages

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "Firstname") {
      setFirstname(value);
    } else if(name === "Password") {
      setPassword(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/login?username=${firstname}&password=${password}`);
      const result = await response.json();

      setMessage(result);
    } catch(error) {
      console.log("Error fetching data: ", error);
    }
  }

  return (
    <main className={styles.main}>
      <div>
      <h1>Login</h1>
      <form action="" method="GET">
        <div>{ message }</div>
        <label for="Firstname">Firstname</label><br /><br />
        <input type="text" name="Firstname" id="FirstName" value={firstname} onChange={handleChange} /><br /><br />
        <label for="Password">Password</label><br /><br />
        <input type="password" name="Password" id="Password" value={password} onChange={handleChange} /><br /><br />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    </main>
  );
}
