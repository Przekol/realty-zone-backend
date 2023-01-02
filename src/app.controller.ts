import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  getUsers() {
    return { user: ['test'] };
  }
}
