import db from '../models/index';

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing Parameter!',
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Ok!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDeatilSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter!',
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                });
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    }
                    data.doctorSpecialty = doctorSpecialty;
                } else data = {};
                resolve({
                    errMessage: 'Ok',
                    errCode: 0,
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    getDeatilSpecialtyById: getDeatilSpecialtyById,
};
