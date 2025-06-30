// src/ping.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class PingController {
  @Get('ping')
  ping() {
    return { ok: true, message: 'Backend activo' };
  }
}
