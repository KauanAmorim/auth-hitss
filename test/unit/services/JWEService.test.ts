import { JWEService } from "../../../src/infra/JWE/JWEService";

const jweService = new JWEService();

describe("JWEService", () => {
    it("should validate a genereted jwe", () => {
        const jweGenerated = jweService.generateJWE({
            email: "kauan@teste.com",
            senha: "senhaTeste123",
            dataCriacao: new Date()
        });

        console.log(jweGenerated);
    })
});
