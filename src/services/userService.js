import db from '../models/index';
import bcrypt, { hash } from 'bcryptjs';

//

const salt = bcrypt.genSaltSync(10);
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
//

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'], //define  columns that you want to show
                    raw: true,
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user isn't fould`;
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `your email in't exist in your system. pls try other email`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

//

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

//

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'], // don't show password
                    },
                });
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

//

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check user email exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'your email is already in used, plz try another email',
                });
            } else {
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
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: {
                id: userId,
            },
        });
        try {
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'the user is not exist',
                });
            }

            await db.User.destroy({
                where: {
                    id: userId,
                },
            });
            resolve({
                errCode: 0,
                message: 'the user deleted',
            });
        } catch (e) {
            reject(e);
        }
    });
};
//
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'missing required parameter',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve({
                    errCode: 0,
                    message: 'user update succeeds',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'user not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {
                        type: typeInput,
                    },
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
};
//

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
};
