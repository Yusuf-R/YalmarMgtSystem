require('dotenv').config({
    path: '../server/.env',
});
const nodemailer = require('nodemailer');
const { SERVICE, CLIENT, PASS, HOST, MAILER_PORT } = process.env;

class MailClient {
    static getTransporter() {
        return nodemailer.createTransport({
            service: SERVICE,
            port: MAILER_PORT,
            secure: true,
            host: HOST,
            auth: {
                user: CLIENT,
                pass: PASS,
            },
        });
    }

    // Static method to send the reset token
    static async sendToken(staff) {
        const transporter = this.getTransporter(); // Call getTransporter to initialize transporter
        const { email, fullName, resetOTP } = staff;
        try {
            const info = await transporter.sendMail({
                from: 'yalmar.tech@gmail.com',
                to: email,
                subject: 'Password Reset Token',
                html: `
                    <p>Dear ${fullName},</p>
                    <p>To reset your password, please use the following token:</p>
                    <h3>${resetOTP}</h3>
                    <p>This token is valid for 5 minutes. Do not share it with anyone.</p>
                    <p>If you did not request this token, please ignore this email.</p>
                    <p>Best regards,<br/>Yalmar Management System</p>
                `,
            });
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send email');
        }
    }
}

// Export the class itself, instead of an instance
module.exports = MailClient;