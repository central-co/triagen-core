export abstract class IApplicationRepository {
    abstract save(
        shortCode: string,
        candidateId: string,
        jobId: string,
    ): Promise<void>;
    abstract findByShortCode(shortCode: string): Promise<any>;
}
