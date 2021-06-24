import emailServices from './email.service';
import tokenServices from './token.service';

const verificationServices = {
  generateTokenAndSend(email: string, id: string) {
    const token = tokenServices.generateEmailVerificationToken({ email, id });
    const url = `http://localhost:5000/api/verification/confirm?token=${token}`;
    emailServices.sendVerificationEmail(email, url);
  },
};

export default verificationServices;
