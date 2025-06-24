import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    check(): { status: string } {
        return { status: 'ok' };
    }

    @Post('auth')
    async postAuth(@Body() authDto: AuthDto): Promise<{ token: string }> {
        return await this.appService.postAuth(authDto);
    }
}
