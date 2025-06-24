import { Module } from '@nestjs/common';
import { AppController } from '@presentation/app.controller';
import { AppService } from '@presentation/app.service';
import { ConfigModule } from '@nestjs/config';
import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { JwtTokenProvider } from '@infrastructure/providers/jwt-token.provider';
import { AuthUseCase } from '@application/usecases/auth.usecase';
import { CompanyModule } from './company/company.module';
import { ApplicationModule } from './application/application.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CompanyModule,
        ApplicationModule,
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
