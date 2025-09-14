"use server"
import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"

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
        // Convert logo to base64 for reliable embedding across all environments
        let logoAttachment;
        try {
            const logoPath = path.resolve(process.cwd(), 'public', 'muthoot_logo.png');
            const logoBuffer = fs.readFileSync(logoPath);
            const logoBase64 = logoBuffer.toString('base64');
            
            logoAttachment = {
                filename: 'muthoot_logo.png',
                content: logoBase64,
                encoding: 'base64' as const,
                cid: 'muthoot_logo_cid'
            };
        } catch (fileError) {
            console.warn('Logo file not found, using fallback text:', fileError);
            // If logo file is not available, we'll use a text fallback
            logoAttachment = null;
        }

        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: 'Your Password for Admission Portal',
            text: `Your password is: ${password}\n\n`,
            // Only include attachment if logo was successfully loaded
            ...(logoAttachment && { attachments: [logoAttachment] }),
            html: `
                <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                        <!-- Header Section -->
                        <div style="background-color: #D71920; padding: 30px; text-align: center;">
                            ${logoAttachment 
                                ? '<img src="cid:muthoot_logo_cid" alt="MITS Logo" width="100" style="max-width: 100%; height: auto;">'
                                : '<h1 style="color: white; margin: 0; font-size: 24px;">MITS</h1>'
                            }
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

                            <p style="margin-top: 30px; line-height: 1.6; font-style: italic; color: #666666;">
                                <em>For security reasons, do not share this password with anyone.</em>
                            </p>
                        </div>

                        <!-- Footer Section -->
                        <div style="padding: 20px; text-align: center; background-color: #fafafa; font-size: 12px; color: #666666;">
                            <p style="margin: 0; padding: 10px;">
                                Need help? Contact our support team at <a href="mailto:support@mits.com" style="color: #D32F2F; text-decoration: none;">Ms. Rija Jose: 6309387606</a>
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