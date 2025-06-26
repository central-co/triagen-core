import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';

import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class JwtTokenProvider extends ITokenProvider {
    constructor(private readonly configService: ConfigService) {
        super();
    }
    async generate(
        email: string,
        name: string,
        roomName: string,
    ): Promise<string> {
        const token = new AccessToken(
            this.configService.get<string>('LIVEKIT_API_KEY'),
            this.configService.get<string>('LIVEKIT_API_SECRET'),
            {
                identity: email,
                name: name,
                ttl: 60 * 60, // 1 hour
            },
        );

        token.addGrant({
            canPublish: true,
            roomJoin: true,
            room: roomName,
        });

        return await token.toJwt();
    }
}
