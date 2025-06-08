import { Body, Controller, Post } from '@nestjs/common'
import { MailService } from '../mail/mail.service'
import { ContactDto } from './contact.dto'

@Controller('api/contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async handleContact(@Body() body: ContactDto) {
    const { name, email, subject, message } = body

    await this.mailService.sendMail({
      to: (process.env.EMAIL_TO ?? process.env.EMAIL_USER) as string,
      subject: `Mensaje de ${name} - ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa; padding: 2rem;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
            <div style="background-color: #4f46e5; color: white; padding: 1.5rem; text-align: center;">
              <h2 style="margin: 0; font-size: 1.5rem;">📩 Nuevo mensaje desde tu sitio web</h2>
            </div>
            <div style="padding: 2rem; color: #333;">
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
              <p><strong>Asunto:</strong> ${subject}</p>
              <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="white-space: pre-line;"><strong>Mensaje:</strong><br/>${message}</p>
            </div>
            <div style="background-color: #f1f5f9; padding: 1rem; text-align: center; font-size: 0.875rem; color: #6b7280;">
              Este mensaje fue enviado desde tu portafolio .
            </div>
          </div>
        </div>
      `
    })

    return { message: 'Correo enviado correctamente' }
  }
}
