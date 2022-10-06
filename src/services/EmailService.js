require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.PASSWORD_APP, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"check 👻" <vuxuan1832511@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: 'Thông Tin Đặt Lịch Khám Bệnh Tại VUX', // Subject line
        html: getBodyHTML(dataSend), // html body
    });
};

let getBodyHTML = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
                <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên VUX</p>
                <p> Thông tin đặt lịch khám bệnh: </p>
                <div><b>Thời gian: ${dataSend.time}</b></div>
                <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
                <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn thành việc đặt lịch khám bệnh</p>
              
                <div><a href=${dataSend.redirectLink} target="_black"> Click here</a></div>
                <p>Xin cảm ơn</p>
        `;
    }
    if (dataSend.language === 'en') {
        result = `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked a medical appointment on VUX</p>
        <p> Information to schedule an appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment</p>
      
        <div><a href=${dataSend.redirectLink} target="_black"> Click here</a></div>
        <p>Thank You!</p>
`;
    }
    return result;
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
};
