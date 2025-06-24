import { Injectable } from "@nestjs/common";
import { customAlphabet } from "nanoid";

@Injectable()
export class GenerateShortCodeUseCase {
    execute(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid7 = customAlphabet(alphabet, 7);

        return nanoid7();
    }
}
