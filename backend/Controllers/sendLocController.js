import nodemailer from "nodemailer";
export const sendLocController=async(req,res)=>{
    const {email,location}=req.body;
    let transporter=nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.MAIL_ID,
            pass: process.env.PASS
        }
    })
    console.log(location.lat);
    console.log(location.lng);
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: 'Current Location',
        text: `My current location:\nLatitude: ${location.lat}\nLongitude: ${location.lng}\nGoogle Maps: https://maps.google.com/?q=${location.lat},${location.lng}`
    };

    await transporter.sendMail(mailOptions);
};