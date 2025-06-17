export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly username: string,
        public readonly name: string,
    ) {}

    static create({ id, email, password, username, name }): User {
        return new User(id, email, password, username, name);
    }
}
