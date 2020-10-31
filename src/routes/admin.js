const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//Panel de Control
router.get('/Dashboard', isLoggedIn, async(req, res) => {
    const id = req.user.Id_Empleado;
    const usuarios = await pool.query('SELECT * FROM empleado e JOIN cargo c ON c.Id_Cargo = e.Id_Cargo WHERE Id_Empleado = ?', [id]);
    const usuario = usuarios[0];
    res.render('./Admin/Dashboard', { usuario });
});

//Usuarios
router.get('/Usuarios', async(req, res) => {
    const usuarios = await pool.query('SELECT * FROM empleado e JOIN cargo c ON c.Id_Cargo = e.Id_Cargo');
    res.render('./Admin/Usuario', { usuarios });
});

//CreateUser Form
router.post('/CreateUser', async(req, res) => {
    const { nombre, dni, apellido, cargo, telefono, password } = req.body;
    const newUser = {
        Nombre: nombre,
        Password: password,
        Apellido: apellido,
        Id_Empleado: dni,
        Id_Cargo: cargo,
        Telefono: telefono
    };
    newUser.Password = await helpers.encrypPassword(password);
    const result = await pool.query('INSERT into empleado set ?', [newUser]);
    req.flash('success', 'Usuario creado correctamente');
    res.redirect('/Usuarios');
});

//Eliminar Usuario
router.get('/Usuarios/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM empleado WHERE Id_Empleado = ?', [id]);
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/Usuarios');
});

//Editar Usuarios
router.post('/Usuarios/Edit', async(req, res) => {
    const { nombre, apellido, cargo, dni, telefono, password } = req.body;
    console.log(req.body);
    const newUser = {
        Nombre: nombre,
        Apellido: apellido,
        Id_Cargo: cargo,
        Telefono: telefono,
        Password: password,
    }
    newUser.Password = await helpers.encrypPassword(password);
    const result = await pool.query('UPDATE empleado set ? WHERE Id_Empleado = ?', [newUser, dni]);
    req.flash('success', 'Usuario modificado correctamente');
    res.redirect('/Usuarios');
});

//Carta
router.get('/Carta', isLoggedIn, async(req, res) => {
    const productos = await pool.query('SELECT * FROM producto');
    res.render('./Admin/Carta', { productos });
});

//Edita un producto
router.post('/Carta/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { Nombre, Precio, Descripcion } = req.body;
    const newProducto = {
        Nombre,
        Precio,
        Descripcion
    }

    await pool.query('UPDATE producto set ? WHERE Id_Producto = ?', [newProducto, id]);
    req.flash('success', 'Producto modificado correctamente');
    res.redirect('/Carta');
});

//Crea un Producto
router.post('/Carta/create', async(req, res) => {
    const { Nombre, Precio, Descripcion } = req.body;
    const newProducto = {
        Nombre,
        Precio,
        Descripcion
    }
    await pool.query('INSERT into producto set ?', [newProducto]);
    req.flash('success', 'Producto creado correctamente');
    res.redirect('/Carta');
});

//Borra un producto
router.get('/Carta/delete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM producto WHERE Id_Producto = ?', [id]);
    req.flash('success', 'Producto Eliminado correctamente');
    res.redirect('/Carta');
});

module.exports = router;