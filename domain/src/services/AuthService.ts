import { Usuario } from "../entities/Usuario";

export class AuthService {
  static verificarRol(usuario: Usuario, rolRequerido: string): boolean {
    return usuario.rol === rolRequerido;
  }

  static generarToken(usuario: Usuario): string {
    // Implementación simplificada (usar JWT en producción)
    return Buffer.from(`${usuario.email}:${usuario.rol}`).toString('base64');
  }
}