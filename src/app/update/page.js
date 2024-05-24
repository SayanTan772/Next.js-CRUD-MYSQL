'use client';

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Register() {
    const [mssg, setMssg] = useState('');

    const initialFormData = {
        Email: '',
        Password: '',
        confirmPass: ''
      };
    
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
      };

    return (
        <main className={styles.main}>
        <h1>Sign Up</h1>
        <form action="" method="PUT" onSubmit={handleSubmit}>
        <div>{ mssg }</div>
        <label for="Email">Email:</label>
        <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} /><br /><br />
        <label for="password">Password:</label>
        <input type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange} /><br /><br />
        <label for="password">Confirm Password:</label>
        <input type="password" id="confirmPass" name="confirmPass" value={formData.confirmPass} onChange={handleChange} /><br /><br />
        <button type="submit">Sign Up</button>
        </form>
        </main>
    );
}