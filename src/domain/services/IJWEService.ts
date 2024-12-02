export type payloadJWE = {
  email: string;
  senha: string;
  dataCriacao: Date;
}


export interface IJWEService {
  generateJWE(payload: payloadJWE): Promise<string>;
  decryptJWE(jwe: string): Promise<string>;
}