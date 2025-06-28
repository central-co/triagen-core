export abstract class IJobRepository {
    abstract save(title: string, companyId: string, description?: string): Promise<any>;
}
