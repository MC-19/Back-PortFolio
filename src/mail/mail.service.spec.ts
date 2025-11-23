// src/mail/mail.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeAll(() => {
    // Simulamos las env vars necesarias para que el constructor no reviente
    process.env.RESEND_API_KEY = 'test_resend_key';
    process.env.EMAIL_FROM = '"MC Portfolio" <onboarding@resend.dev>';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
