const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encrypPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {}
};

helpers.getCargo = (user) => {
    const Cargo = {
        admin: null,
        cocinero: null,
        repartidor: null,
        despachador: null,
        almacen: null
    }
    try {
        switch (user.Id_Cargo) {
            case 1:
                Cargo.admin = "Administrador";
                break;
            case 2:
                Cargo.cocinero = "Cocinero";
                break;
            case 3:
                Cargo.repartidor = "Repartidor";
                break;
            case 4:
                Cargo.despachador = "Despachador";
                break;
            case 5:
                Cargo.almacen = "Almacen";
                break;
        }
    } catch (error) {}
    return Cargo;
};

module.exports = helpers;