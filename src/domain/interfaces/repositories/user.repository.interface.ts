import { User } from '@domain/entities/user.entity';

export abstract class IUserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
}
