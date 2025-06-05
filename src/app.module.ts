import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from '@presentation/message/message.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration]
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
