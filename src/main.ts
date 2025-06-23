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
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
