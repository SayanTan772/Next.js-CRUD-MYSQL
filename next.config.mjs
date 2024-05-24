/** @type {import('next').NextConfig} */

// This is used to store a configuration object in nextjs declared with environment variables
// The environment variable is a way of storing sensitive information like database credentials in our case, 
// API keys, and other configuration details
// In our case, the `env` is the environment variable which stores MYSQL database configuration details
const nextConfig = {
    env: {
        'MYSQL_HOST': '127.0.0.1', // This property specifies the hostname or IP address of the MySQL server. In our case the XAMPP Localhost
        'MYSQL_PORT': '3306', // You can get this port number from the XAMPP control panel beside mysql option
        'MYSQL_DATABASE': 'demo', // Name of the Database
        'MYSQL_USER': 'root', // This specifies the username used to authenticate the access to database
        'MYSQL_PASSWORD': '', // Keep the password empty to easily access your database
    }
}

export default nextConfig; // Export this configuration object to be used later on as module to establish connectivity to MYSQL database

// These configurations can be utilited by using process.env keyword ( more on them in db.js file )