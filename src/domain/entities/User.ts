import crypto from "node:crypto";

export type UserProps = {
  id: string;
  email: string;
  senha: string;
  jwe: string;
  dataCriacao: Date;
};

export class User {
  private static emailRegExp =
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  constructor(private props: UserProps) {}

  public static create(email: string, senha: string, jwe: string) {
    this.validateUser(email, senha, jwe);
    const user = this.createUser(email, senha, jwe);
    return user;
  }

  private static createUser(email: string, senha: string, jwe: string) {
    const user = new User({
      id: crypto.randomUUID().toString(),
      email,
      senha,
      jwe,
      dataCriacao: new Date(),
    });
    return user;
  }

  private static validateUser(email: string, senha: string, jwe: string) {
    this.validateEmail(email);
    this.validateSenha(senha);
    this.validateJWE(jwe);
  }

  private static validateEmail(email: string) {
    this.checkEmptyEmail(email);
    this.checkEmailFormat(email);
    this.checkEmailMinLength(email);
    this.checkEmailMaxLength(email);
  }

  private static checkEmptyEmail(email: string) {
    if (email.length === 0) {
      throw new Error("Email is empty");
    }
  }
  private static checkEmailFormat(email: string) {
    const validEmail = email.match(this.emailRegExp);
    if (!validEmail) {
      throw new Error(`Invalid email`);
    }
  }

  private static checkEmailMinLength(email: string) {
    if (email.length < 10) {
      throw new Error(`Email too short`);
    }
  }
  private static checkEmailMaxLength(email: string) {
    if (email.length > 250) {
      throw new Error(`Email too long`);
    }
  }

  private static validateSenha(senha: string) {
    this.checkEmptySenha(senha);
    this.checkSenhaMinLength(senha);
    this.checkSenhaMaxLength(senha);
  }
  private static checkEmptySenha(senha: string) {
    if (senha.length === 0) {
      throw new Error(`Senha is empty`);
    }
  }
  private static checkSenhaMinLength(senha: string) {
    if (senha.length < 12) {
      throw new Error(`Senha too short`);
    }
  }
  private static checkSenhaMaxLength(senha: string) {
    if (senha.length > 100) {
      throw new Error(`Senha too long`);
    }
  }

  private static validateJWE(jwe: string) {
    this.checkEmptyJWE(jwe);
  }

  private static checkEmptyJWE(jwe: string) {
    if (jwe.length === 0) {
      throw new Error(`JWE is empty`);
    }
  }

  public get id() {
    return this.props.id;
  }

  public get email() {
    return this.props.email;
  }

  public get senha() {
    return this.props.senha;
  }

  public get jwe() {
    return this.props.jwe;
  }

  public get dataCriacao() {
    return this.props.dataCriacao;
  }
}
