const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario'); // llamamos el schema

const app = express();

app.get('/usuarios', function(req, res) {

    let desde = Number(req.query.desde) || 0;

    let limite = Number(req.query.limite) || 5;

    Usuario.find({ estado: true }, 'nombre email estado img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, rows) => {

                res.json({

                    ok: true,
                    usuarios,
                    rows

                });

            })

        })

});

app.post('/guardarUsuario', function(req, res) {

    let body = req.body;

    let usuario = Usuario({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        })

    });


});

app.put('/actualizarUsuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'password', 'img', 'role', 'estado']);

    //para regresar el usuario actualizado
    let options = {

        new: true,
        runValidators: true

    }
    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});

app.delete('/eliminarUsuario/:id', function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['estado']);

    //para regresar el usuario actualizado
    let options = {

        new: true,
        runValidators: true

    }

    let updateObject = { estado: false };

    Usuario.findByIdAndUpdate(id, updateObject, options, (err, borro) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({

            ok: true,
            usuario: borro

        })

    });

});

module.exports = app;