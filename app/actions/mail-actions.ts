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
                <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                        <!-- Header Section -->
                        <div style="background-color: #D32F2F; padding: 30px; text-align: center;">
                            <img src="/muthoot_logo.png" alt="MITS Logo" width="150" style="max-width: 100%; height: auto;">
                        </div>

                        <!-- Main Content -->
                        <div style="padding: 40px 30px; color: #333333;">
                            <h2 style="color: #D32F2F; margin: 0 0 20px 0;">Welcome to MITS!</h2>
                            <p style="line-height: 1.6; margin: 0 0 25px 0;">Thank you for registering with MITS. Your account has been successfully created.</p>
                            
                            <div style="background-color: #FFEBEE; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center; font-size: 18px; color: #D32F2F;">
                                Your password:<br>
                                <strong style="font-size: 24px; letter-spacing: 2px;">${password}</strong>
                            </div>

                            <p style="line-height: 1.6; margin: 0 0 25px 0;">Please log in using this password and change it immediately after your first login.</p>

                            <a href="[Login-URL]" style="display: inline-block; background-color: #D32F2F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: 500;">Login to Your Account</a>

                            <p style="margin-top: 30px; line-height: 1.6; font-style: italic; color: #666666;">
                                <em>For security reasons, do not share this password with anyone.</em>
                            </p>
                        </div>

                        <!-- Footer Section -->
                        <div style="padding: 20px; text-align: center; background-color: #fafafa; font-size: 12px; color: #666666;">
                            <p style="margin: 0; padding: 10px;">
                                Need help? Contact our support team at <a href="mailto:support@mits.com" style="color: #D32F2F; text-decoration: none;">support@mits.com</a>
                            </p>
                            <p style="margin: 0; padding: 10px;">
                                © 2023 MITS. All rights reserved.<br>
                                [Company Address]<br>
                                <a href="#" style="color: #D32F2F; text-decoration: none;">Privacy Policy</a> | 
                                
                            </p>
                        </div>
                    </div>
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