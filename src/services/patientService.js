import db from '../models/index';
import EmailService from './EmailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: -1,
                    errMessage: 'missing parameter',
                });
            } else {
                await EmailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: 'Vu xuan',
                    time: '8:00 - 9:00 Chủ nhật 3/10/2022',
                    doctorName: 'Vuxuan',
                    redirectLink: 'https://www.youtube.com/watch?v=nkgTyPGQK4w',
                });
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                }
                resolve({
                    data: user,
                    errCode: 0,
                    errMessage: 'save success',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
