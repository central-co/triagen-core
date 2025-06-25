export abstract class ICandidateRepository {
    abstract save(
        firstName: string,
        lastName: string,
        email: string,
        resume: string,
    ): Promise<void>;
    abstract findByEmail(email: string): Promise<any>;
}
