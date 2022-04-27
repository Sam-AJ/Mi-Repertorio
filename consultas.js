const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'postgresql',
    database: 'repertorio',
    host: 'localhost',
    port: 5432
});

const insertar = async (cancion) => {
    try {
        const { titulo, artista, tono } = cancion;
        const config = {
            text: "INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3) RETURNING *",
            values: [titulo, artista, tono]
        };
        const resp = await pool.query(config);
        return resp;
    } catch (error) {
        return error
    }
}

const consultar = async () => {
    const sql = "SELECT * FROM canciones";
    const resp = await pool.query(sql);
    return resp;
}

const actualizar = async (id, cancion) => {
    try {
        const { titulo, artista, tono } = cancion;
        const config = {
            text: "UPDATE canciones SET titulo=$2, artista=$3, tono=$4 WHERE id=$1 RETURNING *",
            values: [id, titulo, artista, tono]
        }

        const resp = await pool.query(config);
        return resp;
    } catch (error) {
        return error;
    }
}

const eliminar = async (id) => {
    try {
        const config = {
            text: "DELETE FROM canciones WHERE id=$1 RETURNING *",
            values: [id]
        }
        const resp = await pool.query(config);
        return resp;    
    } catch (error) {
        return error
    }   
}

module.exports = { insertar, consultar, actualizar, eliminar }