export class Candidate {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly username: string,
        public readonly name: string,
    ) {}

    static create({ id, email, password, username, name }): Candidate {
        return new Candidate(id,
            email,
            password,
            username,
            name);
    }
}
