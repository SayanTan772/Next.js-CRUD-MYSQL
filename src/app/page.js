'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Login() {
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('none');
  const [display, setDisplay] = useState('none');

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

      if(response.ok) {
        setDisplay('none');
        setMessage(result);
        setShow('flex');
      } else {
        setMessage(result);
        setDisplay('flex');
      }
    } catch(error) {
      console.log("Error fetching data: ", error);
    }
  }

  return (
    <main className={styles.main}>
      <div>
      <form className={styles.form} action="" method="GET" autoComplete="off">
        <h1 className={styles.h}>Log In</h1>
        <div className={styles.success} style={{ display: `${show}` }}>{ message }</div>
        <div className={styles.alert} style={{ display: `${display}` }}>{ message }</div>
        <label for="Firstname" className={styles.label}>Firstname</label><br />
        <input className={styles.input} type="text" name="Firstname" id="FirstName" value={firstname} onChange={handleChange} spellCheck="false" /><br />
        <label for="Password" className={styles.label}>Password</label><br />
        <input className={styles.input} type="password" name="Password" id="Password" value={password} onChange={handleChange} spellCheck="false" /><br />
        <div className={styles.div}><button className={styles.btn} onClick={handleSubmit}>Submit</button></div>
      </form>
    </div>
    </main>
  );
}
