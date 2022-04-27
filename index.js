const express = require('express');
const app = express();

const { insertar, consultar, actualizar, eliminar } = require('./consultas.js');

app.use(express.json());

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/cancion", async (req, res) => {
    try {
        const resp = await insertar(req.body);
        res.status(201).json(resp.rows ? resp : { code: resp.code})
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
    }
});

app.get("/canciones", async (req, res) => {
    const resp = await consultar();
    res.json(resp.rows);
});

app.put("/cancion", async (req, res) => {
    const resp = await actualizar(req.body);
    if(!resp.rows){
        resp.mensaje = resp.message;
    }
    res.status(resp.rows ? 200 : 500).json(resp);
});

app.delete("/cancion", async (req, res) => {
    const id = req.query.id;
    const resp = await eliminar(id);
    res.json(resp.rows ? resp : { code: resp.code})
});