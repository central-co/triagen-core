export abstract class ICompanyRepository {
    abstract save(name: string, website: string): Promise<void>;
}
