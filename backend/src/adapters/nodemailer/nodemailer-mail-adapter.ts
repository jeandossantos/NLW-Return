import { MailAdapter, SendMailData } from "../mailer-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "015620384329c1",
        pass: "7c3b21368d3fea"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {

        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com',
            to: 'Jean dos Santos <txtdbr@gmail.com>',
            subject,
            html: body
        })
    }
}