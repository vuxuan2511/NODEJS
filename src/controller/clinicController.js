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
module.exports = {
    createClinic: createClinic,
};
