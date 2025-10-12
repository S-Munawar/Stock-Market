import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

// Verify transporter at startup (non-fatal)
transporter.verify().then(() => {
  console.log('Nodemailer transporter verified');
}).catch((err) => {
  console.warn('Nodemailer transporter verification failed:', err && err.message ? err.message : err);
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Stock Market" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: `Welcome to Stock Market - your stock market toolkit is ready!`,
        text: 'Thanks for joining Stock Market',
        html: htmlTemplate,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('sendWelcomeEmail result:', info && info.messageId ? info.messageId : info);
    return { success: true, info };
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<{ success: boolean; info?: any; error?: any }> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        // use authenticated address as From to avoid provider rejections
        from: process.env.NODEMAILER_EMAIL ? `"Signalist News" <${process.env.NODEMAILER_EMAIL}>` : `"Signalist News" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('sendNewsSummaryEmail result for', email, info && info.messageId ? info.messageId : info);
        return { success: true, info };
    } catch (error) {
        console.error('sendNewsSummaryEmail failed for', email, error && (error as any).message ? (error as any).message : error);
        return { success: false, error };
    }
};