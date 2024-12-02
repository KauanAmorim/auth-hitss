import { IJWEService, payloadJWE } from "../../domain/services/IJWEService";
import jose from "jose";

export class JWEService implements IJWEService {
  private secretKey = 'b1f4e3d2c5a8f92754a5a9f6f98b1c6c';

  async generateJWE(payload: payloadJWE): Promise<string> {
    const toEncrypt = new Object({
      email: payload.email,
      senha: payload.senha,
      dataCriacao: payload.dataCriacao,
    }).toString();

    const jwe = await new jose.CompactEncrypt(
      new TextEncoder().encode(toEncrypt)
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(new TextEncoder().encode(this.secretKey));

    return jwe;
  }

  async decryptJWE(jwe: string): Promise<string> {
    const secretKeyEncoded = new TextEncoder().encode(this.secretKey);
    const { plaintext, protectedHeader } = await jose.compactDecrypt(
      jwe,
      secretKeyEncoded
    );
    return new TextDecoder().decode(plaintext);
  }
}
