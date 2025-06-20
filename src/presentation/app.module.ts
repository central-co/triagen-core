import { Module } from '@nestjs/common';
import { AppController } from 'src/presentation/app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '@presentation/app.service';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { JwtTokenProvider } from '@infrastructure/providers/jwt-token.provider';
import { AuthUseCase } from '@application/usecases/auth.usecase';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthUseCase,
        {
            provide: ITokenProvider,
            useClass: JwtTokenProvider,
        },
    ],
})
export class AppModule {}
