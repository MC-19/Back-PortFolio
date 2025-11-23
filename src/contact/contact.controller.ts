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
        <div style="font-family: 'Inter', 'Segoe UI', sans-serif; background-color: #0f0f0f; padding: 2rem;">
          <div style="max-width: 620px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 10px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 1.4rem; text-align: center;">
              <h2 style="margin: 0; font-size: 1.4rem; font-weight: 600;">
                Nuevo mensaje desde tu portafolio
              </h2>
            </div>
            
            <!-- Body -->
            <div style="padding: 2rem; color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
              <p><strong style="color: #06b6d4;">Nombre:</strong> ${name}</p>
              <p><strong style="color: #06b6d4;">Email:</strong> 
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </p>
              <p><strong style="color: #06b6d4;">Asunto:</strong> ${subject}</p>
            
              <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #1f2937;" />
            
              <p style="white-space: pre-line;">
                <strong style="color: #06b6d4;">Mensaje:</strong><br/>${message}
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0f172a; padding: 1rem; text-align: center; font-size: 0.85rem; color: #6b7280;">
              Este mensaje fue enviado desde tu portafolio profesional.
            </div>
            
          </div>
        </div>
      `
    })

    return { message: 'Correo enviado correctamente' }
  }
}
