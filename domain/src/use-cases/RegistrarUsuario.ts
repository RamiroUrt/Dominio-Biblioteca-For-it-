// import { Usuario } from "../entities/Usuario";
// import { IUsuarioRepository } from "../repositories/UsuarioRepository";
// import { Email } from "../value-objects/Email";
// import { Password } from "../value-objects/Password";

// export class RegistrarUsuario {
//   constructor(private repo: IUsuarioRepository) {}

//   async execute(dto: {
//     nombre: string;
//     email: string;
//     password: string;
//     rol: string;
//   }): Promise<Usuario> {
//     const email = new Email(dto.email);
//     const password = await Password.create(dto.password);

//     const usuario: Usuario = {
//       id: Date.now().toString(),
//       nombre: dto.nombre,
//       email: email.toString(),
//       password: await password.toString(),
//       rol: dto.rol as "cliente" | "admin"
//     };

//     await this.repo.guardar(usuario);
//     return usuario;
//   }
// }

import { Usuario } from "../entities/Usuario";
import { IUsuarioRepository } from "../repositories/UsuarioRepository";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";

type RegistrarUsuarioDTO = {
  nombre: string;
  email: string;
  password: string;
  rol: "cliente" | "admin";
};

export class RegistrarUsuario {
  constructor(private usuarioRepo: IUsuarioRepository) {}

  async execute(dto: RegistrarUsuarioDTO): Promise<Usuario> {
    // Validar email
    const email = new Email(dto.email);
    
    // Verificar si el usuario ya existe
    const existe = await this.usuarioRepo.buscarPorEmail(email.toString());
    if (existe) throw new Error("El usuario ya está registrado");

    // Hashear contraseña
    const password = await Password.create(dto.password);

    const usuario: Usuario = {
      id: Date.now().toString(),
      nombre: dto.nombre,
      email: email.toString(),
      password: password.toString(),
      rol: dto.rol
    };

    await this.usuarioRepo.guardar(usuario);
    return usuario;
  }
}