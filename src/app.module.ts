import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ContactController } from './contact/contact.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingController } from './ping.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // para poder usar process.env globalmente
    }),
    MailModule,
  ],
  controllers: [ContactController, AppController, PingController ],
  providers: [AppService],
})
export class AppModule {}
