'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Register() {
    const [mssg, setMssg] = useState('');

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
            setMssg(result);
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
      };

    return (
        <main className={styles.main}>
        <h1>Sign Up</h1>
        <form action="" method="POST" onSubmit={handleSubmit}>
        <div>{ mssg }</div>
        <label for="firstname">firstname:</label>
        <input type="text" id="Firstname" name="Firstname" value={formData.Firstname} onChange={handleChange} /><br /><br />
        <label for="lastname">lastname:</label>
        <input type="text" id="Lastname" name="Lastname" value={formData.Lastname} onChange={handleChange} /><br /><br />
        <label for="Phoneno">Phoneno:</label>
        <input type="number" id="Phoneno" name="Phoneno" value={formData.Phoneno} onChange={handleChange} /><br /><br />
        <label for="Email">Email:</label>
        <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} /><br /><br />
        <label for="password">Password:</label>
        <input type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange} /><br /><br />
        <button type="submit">Sign Up</button>
        </form>
        </main>
    );
}