import { Plato } from "./Plato";
import { Usuario } from "./Usuario";

export type EstadoPedido = "pendiente" | "preparando" | "en-camino" | "entregado" | "cancelado";

export interface Pedido {
  id: string;
  cliente: Usuario;
  items: Plato[];
  estado: EstadoPedido;
  fecha: Date;
  total: number;
}