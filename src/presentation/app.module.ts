import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@presentation/app.controller';

import { ApplicationModule } from './application/application.module';
import { InterviewModule } from './interview/interview.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ApplicationModule,
        InterviewModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
