import db from '../models/index';
import bcrypt from 'bcryptjs';

//
const salt = bcrypt.genSaltSync(10);

//
let createNewUsers = async (data) => {
    return new Promise(async (res, rej) => {
        try {
            let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            res('ok! create new a user succeed');
        } catch (e) {
            rej(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise((res, rej) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            res(hashPassword);
        } catch (e) {
            rej(e);
        }
    });
};

let getAllUsers = () => {
    return new Promise(async (res, rej) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            res(users);
        } catch (e) {
            rej(e);
        }
    });
};

let getUserInforById = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                res(user);
            } else {
                res([]);
            }
        } catch (e) {
            rej(e);
        }
    });
};
//

let updateUserData = (data) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                res();
            }
        } catch (e) {
            console.log(e);
        }
    });
};
//

let deleteUserById = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
            res();
        } catch (e) {
            rej(e);
        }
    });
};

//
module.exports = {
    createNewUsers: createNewUsers,
    getAllUsers: getAllUsers,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};
