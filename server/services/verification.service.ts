import emailServices from './email.service';
import tokenServices from './token.service';

const verificationServices = {
  generateTokenAndSend(email: string, id: string) {
    const token = tokenServices.generateEmailVerificationToken({ email, id });
    const url = `http://localhost:5000/verify/confirm?token=${token}`; // TODO: client implementation
    emailServices.sendVerificationEmail(email, url);
  },
};

export default verificationServices;
