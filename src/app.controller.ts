import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    check(): { status: string } {
        return { status: 'ok' };
    }

    @Get('auth')
    async getAuth(): Promise<{ token: string }> {
        return await this.appService.getAuth();
    }
}
