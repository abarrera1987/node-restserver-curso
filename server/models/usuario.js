const mongoose = require("mongoose"); // acceso a la base de datos
const uniqueValidator = require('mongoose-unique-validator'); // para colocar mensajes en las validaciones
const mongooseHidden = require('mongoose-hidden')(); // para ocultra campos del schema

let rolesValidos = {
    values: ['1', '2'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        hide: true
    },
    img: {
        type: String,
        default: '-'
    },
    role: {
        type: String,
        default: 1,
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

// usuarioSchema.methods.toJSON = function() {

//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;

// }

usuarioSchema.plugin(mongooseHidden); // se le pasa el plugin al schema para que funcione

usuarioSchema.plugin(uniqueValidator, {

    message: '{PATH} sebe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('usuario', usuarioSchema); // exportamos el schema para poderlo usar donde lo llamemos