import { ZodError } from "zod";
import { UserRegisterInputValidator } from "../../../src/infra/validators/UserRegisterInputValidator";

describe("UserRegisterInputValidator", () => {
  it("should validate a valid input", () => {
    const inputData = {
      email: "kauan.teste@gmail.com",
      senha: "senhaDeTeste123",
    };
    expect(() => {
      UserRegisterInputValidator.parse(inputData);
    }).not.toThrow();
  });

  it("should validate an invalid email", () => {
    const inputData = {
      email: "invalidEmailTest",
      senha: "senhaDeTeste123",
    };

    try {
      UserRegisterInputValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].validation).toBe("email");
      expect(error.errors[0].code).toBe("invalid_string");
      expect(error.errors[0].message).toBe("Invalid email");
      expect(error).toBeInstanceOf(ZodError)
    }
  });

  it("should validate an email too small", () => {
    const inputData = {
      email: "a@c.com",
      senha: "senhaDeTeste123",
    };

    try {
      UserRegisterInputValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].code).toBe("too_small");
      expect(error).toBeInstanceOf(ZodError)
    }
  });

  it("should validate an email too big", () => {
    const inputData = {
      email: "a@"+"c".repeat(300)+".com",
      senha: "senhaDeTeste123",
    };

    try {
      UserRegisterInputValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].code).toBe("too_big");
      expect(error).toBeInstanceOf(ZodError)
    }
  });

  it("should validate a senha too small", () => {
    const inputData = {
      email: "kauan.teste@gmail.com",
      senha: "123",
    };

    try {
      UserRegisterInputValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].code).toBe("too_small");
      expect(error).toBeInstanceOf(ZodError)
    }
  });

  it("should validate a senha too big", () => {
    const inputData = {
      email: "kauan.teste@gmail.com",
      senha: "123".repeat(100),
    };

    try {
      UserRegisterInputValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].code).toBe("too_big");
      expect(error).toBeInstanceOf(ZodError)
    }
  });
});
