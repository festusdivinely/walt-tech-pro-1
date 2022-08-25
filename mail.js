import nodemailer from 'nodemailer';
import mailGun from 'nodemailer-mailgun-transport'

const auth = {
    auth: {
        api_key: 'place the key you got from mail gun here',
        domain: 'place the domain name you got from mail gun here'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

 export const sendMail = (Email, subject, text, cb) => {


    const mailOptions = {
        from: Email,
        to: 'festusdivinely@gamil.com this should be authorized by mail gun in mail gun website',
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            cb(error, null)
        }else {
           cb(null, data)
        }
    })
}

export default sendMail