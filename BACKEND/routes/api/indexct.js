var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var doctorController = require("../../controller/doctorController");

//crera un nuevo usuario REGISTANDOTE
router.post('/signupdoctor', doctorController.SignupDoctor);
//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post('/signindoctor', doctorController.SigninDoctor);
//salir de la cuenta del doctor
router.get('/signoutdoctor', passport.authenticate('doctor', { session: false}), doctorController.SignoutDoctor);
//mostrar datos del perfil del doctor
router.get('/doctor/perfil/:id', passport.authenticate('doctor', { session: false}), doctorController.Obtener_datos_doctor);
//actualizar datos del doctor logeado
router.post('/doctor/perfil/update/:id',passport.authenticate('doctor', { session: false}),doctorController.Actualizar_datos_doctor);

//HORARIOS DEL DOCTOR
router.post('/doctor/horario/agregar/:id',passport.authenticate('doctor', { session: false}),doctorController.Agregar_horario_doctor)
// modificar horario del doctors
router.post('/doctor/horario/modificar/:id',passport.authenticate('doctor', { session: false}),doctorController.Actualizar_horario_doctor)
// OBTENER HORARIOS DEL MÉDICO POR ID
router.get('/doctor/horarios/:id',doctorController.Obtener_horario_doctor);
//horarios ocupados por id del doctor
router.get('/doctor/horarios_ocupados/:id',doctorController.Obtener_horarios_ocupados_doctor);
//eliminar hoario del doctor
router.post('/doctor/horario/eliminar/:id',passport.authenticate('doctor', { session: false}),doctorController.Eliminar_horario_doctor);

module.exports = router;