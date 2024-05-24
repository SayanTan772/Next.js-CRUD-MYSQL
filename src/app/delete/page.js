'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Register() {
    const [mssg, setMssg] = useState('');
    const [show, setShow] = useState('none');
    const [display, setDisplay] = useState('none');

    const initialFormData = {
        Email: ''
      };
    
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/delete', {
                method: 'DELETE',
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
        <form className={styles.form} action="" onSubmit={handleSubmit} autoComplete="off">
        <h1 className={styles.h}>Delete User</h1>
        <div className={styles.success} style={{ display: `${show}` }}>{ mssg }</div>
        <div className={styles.alert} style={{ display: `${display}` }}>{ mssg }</div>
        <label className={styles.label} for="Email">Email:</label>
        <input className={styles.input} type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} spellCheck="false" /><br />
        <div className={styles.div}><button className={styles.btn} type="submit">Delete</button></div>
        </form>
        </main>
    );
}