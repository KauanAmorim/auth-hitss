import { ZodError } from "zod";
import { UserDecryptJWEValidator } from "../../../src/infra/validators/UserDecryptJWEInputValidator";

describe("UserDecryptJWEValidator", () => {
  it("should validate a valid jwe length", () => {
    const inputData = {
      jwe: "string".repeat(10),
    };
    expect(() => UserDecryptJWEValidator.parse(inputData)).not.toThrow();
  });

  it("should validate a too small jwe", () => {
    const inputData = {
      jwe: "string",
    };

    try {
      UserDecryptJWEValidator.parse(inputData);
    } catch (error) {
      expect(error.errors[0].code).toBe("too_small");
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
