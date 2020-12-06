var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var organizacionController = require("../../controller/organizacionController");
const { route } = require('./indexusr');

router.get('/',function (req,res) {
  res.render("index",{title:"SICRAM"});  
});


/**ENDPOINTS ORGANIZACION---------------------------------------------------------------------------- */
//crear una nueva organizacion REGISTANDOTE
router.post('/signuporganizacion', organizacionController.SignupOrganizacion);

//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post('/signinorganizacion', organizacionController.SigninOrganizacion);

//salir de la cuenta de la orga
router.get('/signoutorganizacion', passport.authenticate('organizacion', { session: false}), organizacionController.SignoutOrganizacion);

//mostrar datos del perfil de la orga
router.get('/organizacion/perfil/:id', passport.authenticate('organizacion', { session: false}), organizacionController.Obtener_Datos_Organizacion);


module.exports = router;