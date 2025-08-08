import { describe, it, expect, beforeEach } from "vitest";
import { RegistrarUsuario } from "../use-cases/RegistrarUsuario";
import { UsuarioRepositoryMemory } from "../repositories/UsuarioRepository";

describe("RegistrarUsuario", () => {
  let repo: UsuarioRepositoryMemory;
  let casoUso: RegistrarUsuario;

  beforeEach(() => {
    repo = new UsuarioRepositoryMemory();
    casoUso = new RegistrarUsuario(repo);
  });

  it("registra un usuario correctamente", async () => {
    const usuario = await casoUso.execute({
      nombre: "Ana",
      email: "ana@test.com",
      password: "passwordSegura123",
      rol: "cliente"
    });

    expect(usuario.email).toBe("ana@test.com");
    expect(usuario.password).not.toBe("passwordSegura123"); // Debe estar hasheada
  });

  it("falla con email inválido", async () => {
    await expect(
      casoUso.execute({
        nombre: "Ana",
        email: "no-es-un-email",
        password: "password123",
        rol: "cliente"
      })
    ).rejects.toThrow("Formato de email inválido");
  });
});