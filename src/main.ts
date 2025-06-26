import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@presentation/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.enableCors({
        origin: ['https://triagen.app', 'https://triagen-core.onrender.com'],
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
