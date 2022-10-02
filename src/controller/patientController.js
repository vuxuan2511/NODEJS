import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            Message: 'get all doctor fail error form server...',
        });
    }
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
