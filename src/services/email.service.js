import { createTransport, } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // 465 true | 587 false,
  requireTLS: false,
  auth: {
    type: 'LOGIN',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // auth: {
  //   type: 'OAUTH2',
  //   user: process.env.SMTP_USER,
  //   scope : "https://www.googleapis.com/auth/gmail.send",
  //   clientId: process.env.SMTP_CLIENT_ID,
  //   clientSecret: process.env.SMTP_CLIENT_SECRET,
  //   serviceClient: process.env.SMTP_CLIENT_ID,
  //   // privateKey: process.env.CLIENT_SECRET,
  // },
});

export async function sendMail(payload) {
  const verified = await transporter.verify();
  if (!verified) throw new Error('La config esta incompleta');

  const isIdle = transporter.isIdle();
  if (isIdle) return;

  const {
    to,
    subject,
    body,
  } = payload;

  try {
    await transporter.sendMail({
      to,
      from: process.env.SMTP_USER,
      subject,
      html: body,
    });
  } catch (err) {
    console.error('error', JSON.stringify(err));
  }
}