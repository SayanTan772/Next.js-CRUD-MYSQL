'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Register() {
    const [mssg, setMssg] = useState('');

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
            setMssg(result);
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
      };

    return (
        <main className={styles.main}>
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit}>
        <div>{ mssg }</div>
        <label for="Email">Email:</label>
        <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} /><br /><br />
        <button type="submit">Delete</button>
        </form>
        </main>
    );
}