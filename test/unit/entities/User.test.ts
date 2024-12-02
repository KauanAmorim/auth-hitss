import { User } from "../../../src/domain/entities/User";

describe("User Entity", () => {
  test("should create a user entity without error", () => {
    const email = "email@example.com";
    const senha = "senhaValidaDeTeste123";
    const jwe = "randomString";

    const userCreated = User.create(email, senha, jwe);

    expect(userCreated).toBeInstanceOf(User);
    expect(userCreated.email).toBe(email);
    expect(userCreated.senha).toBe(senha);
    expect(userCreated.jwe).toBe(jwe);
    expect(userCreated.id).toBeDefined();
    expect(userCreated.dataCriacao).toBeInstanceOf(Date);
  });

  test("should throw an error of empty email", () => {
    const senha = "senhaValidaDeTeste123";
    const jwe = "randomString";
    expect(() => {
      User.create("", senha, jwe);
    }).toThrow("Email is empty");
  });

  test("should throw and error of invalid email", () => {
    const senha = "senhaValidaDeTeste123";
    const jwe = "randomString";
    expect(() => {
      User.create("banana", senha, jwe);
    }).toThrow("Invalid email");
  });

  test("should throw and error of email too short", () => {
    const senha = "senhaValidaDeTeste123";
    const jwe = "randomString";
    expect(() => {
      User.create("a@e.co", senha, jwe);
    }).toThrow("Email too short");
  });

  test("should throw and error of email too long", () => {
    const senha = "senhaValidaDeTeste123";
    const jwe = "randomString";
    expect(() => {
      User.create("email@"+ "example".repeat(100) + ".com", senha, jwe);
    }).toThrow("Email too long");
  });

  test("should throw an error of empty senha", () => {
    const email = "email@example.com";
    const jwe = "randomString";
    expect(() => {
      User.create(email, "", jwe);
    }).toThrow("Senha is empty");
  });

  test("should throw an error of senha too short", () => {
    const email = "email@example.com";
    const jwe = "randomString";
    expect(() => {
      User.create(email, "123", jwe);
    }).toThrow("Senha too short");
  });

  test("should throw an error of senha too long", () => {
    const email = "email@example.com";
    const jwe = "randomString";
    const senha = "Lorem".repeat(100);
    expect(() => {
      User.create(email, senha, jwe);
    }).toThrow("Senha too long");
  });

  test("should throw an error of jwe is empty", () => {
    const email = "email@example.com";
    const jwe = "randomString";
    const senha = "Lorem".repeat(5);
    expect(() => {
      User.create(email, senha, "");
    }).toThrow("JWE is empty");
  });
});
