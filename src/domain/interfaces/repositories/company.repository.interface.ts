export abstract class ICompanyRepository {
    abstract create(name: string, website: string): Promise<void>;
}
