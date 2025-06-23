import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    check(): { status: string } {
        return { status: 'ok' };
    }

    @Post('auth')
    @Header('Access-Control-Allow-Origin', '*')
    async postAuth(@Body() authDto: any): Promise<{ token: string }> {
        return await this.appService.postAuth();
    }
}
