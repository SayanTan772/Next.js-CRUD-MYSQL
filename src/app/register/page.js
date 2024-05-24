'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Register() {
    const [mssg, setMssg] = useState('');
    const [show, setShow] = useState('none');
    const [display, setDisplay] = useState('none');

    const initialFormData = {
        Firstname: '',
        Lastname: '',
        Phoneno: '',
        Email: '',
        Password: ''
      };
    
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            if(response.ok) {
                setDisplay('none');
                setMssg(result);
                setShow('flex');
              } else {
                setMssg(result);
                setDisplay('flex');
              }
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
      };

    return (
        <main className={styles.main}>
        <form className={styles.form} action="" method="POST" onSubmit={handleSubmit} autoComplete="off">
        <h1 className={styles.h}>Sign Up</h1>
        <div className={styles.success} style={{ display: `${show}` }}>{ mssg }</div>
        <div className={styles.alert} style={{ display: `${display}` }}>{ mssg }</div>
        <label className={styles.label} for="firstname">firstname:</label>
        <input type="text" className={styles.input} id="Firstname" name="Firstname" value={formData.Firstname} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="lastname">lastname:</label>
        <input type="text" className={styles.input} id="Lastname" name="Lastname" value={formData.Lastname} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="Phoneno">Phoneno:</label>
        <input type="number" className={styles.input} id="Phoneno" name="Phoneno" value={formData.Phoneno} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="Email">Email:</label>
        <input type="email" className={styles.input} id="Email" name="Email" value={formData.Email} onChange={handleChange} spellCheck="false" /><br />
        <label className={styles.label} for="password">Password:</label>
        <input type="password" className={styles.input} id="Password" name="Password" value={formData.Password} onChange={handleChange} spellCheck="false" /><br />
        <div className={styles.div}><button className={styles.btn} type="submit">Submit</button></div>
        </form>
        </main>
    );
}