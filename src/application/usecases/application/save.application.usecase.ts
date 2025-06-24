import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveApplicationUseCase {
    async execute(applicationData: any): Promise<void> {
        // Aqui, você pode implementar a lógica para salvar a aplicação no repositório.
        // Por exemplo:
        // await this.applicationRepo.save(applicationData);

        // Exemplo de implementação fictícia:
        console.log("Application data saved:", applicationData);
    }
}
