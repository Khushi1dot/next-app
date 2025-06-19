import nodemailer from 'nodemailer'
const mailconfig = {
  transport: {
    smtp: {
      host: `${process.env.SMTP_HOST}`,
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.SMTP_USER}`,
        pass: `${process.env.SMTP_PASSWORD}`
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  },
  mailOptions: {
    from: `"Digital Platform" <${process.env.SMTP_ADMIN_EMAIL}>`,
    sender: `${process.env.SMTP_SENDER}`,
    replyTo: `${process.env.SMTP_REPLYTO}`
  }
};
 
class Mailer {
  private transporter;
  private mailOptions;
 
  constructor() {
    this.transporter = nodemailer.createTransport(mailconfig.transport.smtp);
    this.mailOptions = mailconfig.mailOptions;
  }
 
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const options = {
      ...this.mailOptions,
      to,
      subject,
      html: body
    };
 
    await this.transporter.sendMail(options);
  }
}
 
const mailer = new Mailer();
export default mailer;
