const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuarios', function(req, res) {
    res.json('Lista de usuarios')
});

app.post('/guardarUsuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            message: 'El nombre es obligatorio'
        });

    } else {

        res.json({

            'usuario': body

        });

    }



});

app.put('/actualizarUsuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({

        id

    });
});

app.delete('/eliminarUsuario', function(req, res) {
    res.json('Elimina usuario')
});

app.listen(process.env.PORT, () => {

    console.log("escuchando el puerto: ", process.env.PORT);

})