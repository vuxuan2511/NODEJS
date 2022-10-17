import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let doctors = await clinicService.createClinic(req.body);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            Message: 'create clinic fail error form server...',
        });
    }
};
let getAllClinic = async (req, res) => {
    try {
        let doctors = await clinicService.getAllClinic();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            Message: 'get all clinic fail error form server...',
        });
    }
};
let getDetailClinicById = async (req, res) => {
    try {
        let doctors = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            Message: 'get detail clinic fail error form server...',
        });
    }
};

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
};
