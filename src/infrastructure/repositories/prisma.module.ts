import { DynamicModule, Module } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Module({})
export class PrismaModule {
    static PRISMA_CLIENT = 'PRISMA_CLIENT';

    static forRoot(): DynamicModule {
        return {
            module: PrismaModule,
            providers: [
                {
                    provide: PrismaModule.PRISMA_CLIENT,
                    useFactory: async () => {
                        const prisma = new PrismaClient();
                        await prisma.$connect();
                        return prisma;
                    },
                },
            ],
            exports: [PrismaModule.PRISMA_CLIENT],
        };
    }
}
