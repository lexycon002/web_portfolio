import express from "express";          
import nodemailer from "nodemailer";     
import rateLimit from "express-rate-limit"; 

const router = express.Router();

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5, 
    message: { error: "Too many contact requests from this IP, please try again later." }
});

router.post("/", contactLimiter, async (req, res) => {
    const { user_name, user_email, message } = req.body;

    if (!user_name || !user_email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: user_email,
        to: process.env.EMAIL_USER,
        subject: `Project and Collaboration Request from ${user_name}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                
                <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Connection!</h1>
                    <p style="color: #e0e7ff; margin: 5px 0 0 0;">You received a message from your portfolio.</p>
                </div>

                <div style="padding: 30px; color: #333333;">
                    <p style="font-size: 16px;"><strong>Name:</strong> ${user_name}</p>
                    <p style="font-size: 16px;"><strong>Email:</strong> <a href="mailto:${user_email}" style="color: #4f46e5; text-decoration: none;">${user_email}</a></p>
                    
                    <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 4px;">
                        <p style="margin: 0; font-style: italic; line-height: 1.6;">"${message}"</p>
                    </div>
                </div>

                <div style="padding: 20px; text-align: center; background-color: #f1f5f9;">
                    <p style="margin-bottom: 15px; font-weight: bold; color: #475569;">Let's stay connected:</p>
                    <a href="https://linkedin.com/in/yourusername" style="margin: 0 10px; text-decoration: none;">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30" alt="LinkedIn">
                    </a>
                    <a href="https://github.com/yourusername" style="margin: 0 10px; text-decoration: none;">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30" alt="GitHub">
                    </a>
                    <a href="https://twitter.com/yourusername" style="margin: 0 10px; text-decoration: none;">
                        <img src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png" width="30" alt="Twitter">
                    </a>
                </div>

                <div style="padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0;">&copy; 2026 Hammad Portfolio | Built with Node.js & Nodemailer</p>
                    <p style="margin: 5px 0;">This email was sent via the automated contact form system.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
});

export default router; 