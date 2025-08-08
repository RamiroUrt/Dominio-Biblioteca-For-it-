import { Usuario } from "../entities/Usuario";

export interface IUsuarioRepository {
  guardar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
}

export class UsuarioRepositoryMemory implements IUsuarioRepository {
  private usuarios: Usuario[] = [];

  async guardar(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarios.find(u => u.email === email) || null;
  }
}