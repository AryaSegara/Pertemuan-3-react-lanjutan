import pg from "pg";

const { Pool } = pg;

// Konfigurasi koneksi ke database
const pool = new Pool({
    user: "postgres",        // Username PostgreSQL
    host: "localhost",       // Host PostgreSQL
    database: "lanjutan",        // Nama database
    password: "your-password",     // Password PostgreSQL
    port: 5432,              // Port PostgreSQL (default: 5432)
});

console.log("Database Connected");

export default pool;