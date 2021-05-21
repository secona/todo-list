import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_NAME } from '../constants';

const emailServices = {
  from: { name: EMAIL_NAME, address: EMAIL_ADDRESS },

  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_ADDRESS, pass: EMAIL_PASSWORD },
  }),

  async sendMail(options: Mail.Options) {
    await this.transporter.sendMail({ ...options, from: this.from });
  },

  async sendVerificationEmail(to: string, url: string) {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'todo-list Email Verification',
      html: `
        Hello! Click here to verify your email:<br/>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="${url}">
          ${url}
        </a>
      `,
    });
  },
};

export default emailServices;
