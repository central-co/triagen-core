export abstract class IApplicationRepository {
    abstract save(interviewToken: string, job: {id: string}, candidate: {name: string, email: string, phone?: string, resume?: string}, ): Promise<any>;
    abstract findByShortCode(shortCode: string): Promise<any>;
}
