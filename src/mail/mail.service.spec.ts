// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      console.error('FALTA RESEND_API_KEY en las variables de entorno');
      throw new Error('RESEND_API_KEY is not set');
    }

    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail(options: { to: string; subject: string; html: string }) {
    const from =
    process.env.EMAIL_FROM ?? `"MC Portfolio" <onboarding@resend.dev>`;

    const result = await this.resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      console.error('Error enviando email con Resend:', result.error);
      throw new Error(result.error.message);
    }

    return result;
  }
}
