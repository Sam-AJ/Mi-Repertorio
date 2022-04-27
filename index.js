const express = require('express');
const app = express();

const { insertar, consultar, actualizar, eliminar } = require('./consultas.js');

app.use(express.json());

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

// Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y  realice a través de 
// una función asíncrona la inserción en la tabla repertorio.
app.post("/cancion", async (req, res) => {
    try {
        const resp = await insertar(req.body);
        res.status(201).json(resp.rows ? resp : { code: resp.code})
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
    }
});

// Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
app.get("/canciones", async (req, res) => {
    const resp = await consultar();
    res.json(resp.rows);
});

// Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función 
// asíncrona para hacer la consulta SQL correspondiente y actualice ese registro de la tabla repertorio.
app.put("/cancion/:id", async (req, res) => {
    let id = req.params.id
    try {
        const resp = await actualizar(id, req.body);
        res.status(201).json(resp.rows ? resp : { code: resp.code})
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
    }
});

// Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y realiza una consulta SQL 
// a través de una función asíncrona para eliminarla de la base de datos.

app.delete("/cancion", async (req, res) => {
    const id = req.query.id;
    const resp = await eliminar(id);
    res.json(resp.rows ? resp : { code: resp.code})
});