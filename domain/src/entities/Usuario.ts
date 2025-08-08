export type Rol = "cliente" | "admin" | "repartidor";

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  password: string;
}