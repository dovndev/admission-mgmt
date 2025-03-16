"use server"
import nodemailer from "nodemailer"

const senderEmail = process.env.SENDER_EMAIL
const senderPassword = process.env.SENDER_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
});

export async function sendPasswordEmail(recipientEmail: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
        // Create a new mailOptions object for each email
        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: 'Your Password for Admission Portal',
            text: `Your password is: ${password}\n\n`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0056b3;">Your Admission Portal Password</h2>
                    <p>Your password is: <strong>${password}</strong></p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to send email'
        };
    }
}

export async function sendCustomEmail(
    recipientEmail: string,
    subject: string,
    textContent: string,
    htmlContent?: string
): Promise<{ success: boolean; message: string }> {
    try {
        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject,
            text: textContent,
            ...(htmlContent && { html: htmlContent })
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to send email'
        };
    }
}