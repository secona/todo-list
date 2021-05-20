import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_NAME } from '../constants';

const emailServices = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_ADDRESS, pass: EMAIL_PASSWORD },
  }),

  async sendMail(options: Mail.Options) {
    await this.transporter.sendMail({
      ...options,
      from: { name: EMAIL_NAME, address: EMAIL_ADDRESS },
    });
  },
};

export default emailServices;
