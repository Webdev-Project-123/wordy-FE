const nodemailer = require("nodemailer");

// const { db } = require('../models/db');

async function sendResetLink(recipient, token) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAUTH2",
            user: "hlehuy0@gmail.com",
            clientId: "277006212636-0ad1eh576t3iv4558pn2tdii0blddl2l.apps.googleusercontent.com",
            clientSecret: "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",
            accessToken: "ya29.A0ARrdaM-9z-_sLFs3RxnWXNkk3_1Cu0Q5cEr-K1NmU7YNbBOzRorleI1mVYeAbMpGx63d4dUnvFpnqe2ftxsvyJ96iz_j3NkmFByGXbswFI_kbyOljHghqCwlX-xtZMQsBdEPzHhFW56Jr06e0Bgcj3EeQjGh",
            refreshToken: "1//04gBfJPVlsdNPCgYIARAAGAQSNwF-L9IrO5lurtUSQJEhMdn-j1oH0mCQTtkinnxtuGfXRxqt591U5cwNoy8boGU1l2MYHgEpy34"
        },
    });

    const mailOptions = {
        from: '"Wordy" <hlehuy0@gmail.com>',
        to: recipient,
        subject: "Reset password link",
        html: `<p>Your reset link: <b>https://localhost:5000/auth/${token}</b><p>`
    };
 
    let info = await transporter.sendMail(mailOptions);

    // await db.get('reset-Token').push({
    //     email: recipient,
    //     resetToken: token,
    // }).write();

    return info;
}

module.exports.sendResetLink = sendResetLink;