import { ITokenProvider } from '@domain/interfaces/providers/token.provider.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class JwtTokenProvider extends ITokenProvider {
    constructor(private readonly configService: ConfigService) {
        super();
    }
    async generate(payload: any): Promise<string> {
        console.log(
            `Generating JWT token with payload: ${JSON.stringify(payload)}`,
        );
        const participantName = 'triagen-participant';
        console.log(`Generating JWT for participant: ${participantName}`);

        const token = new AccessToken(
            this.configService.get<string>('LIVEKIT_API_KEY'),
            this.configService.get<string>('LIVEKIT_API_SECRET'),
            {
                identity: participantName,
                name: participantName,
                ttl: 60 * 60, // 1 hour
            },
        );

        token.addGrant({
            canPublish: true,
            roomJoin: true,
            room: 'triagen-room',
        });

        return await token.toJwt();
    }
}
