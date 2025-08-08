import { Pedido, EstadoPedido } from "../entities/Pedido";
import { Plato } from "../entities/Plato";
import { Usuario } from "../entities/Usuario";

export class CrearPedido {
  static ejecutar(cliente: Usuario, items: Plato[]): Pedido {
    if (items.length === 0) {
      throw new Error("El pedido no puede estar vacío");
    }

    const total = items.reduce((sum, plato) => sum + plato.precio, 0);

    return {
      id: Date.now().toString(),
      cliente,
      items,
      estado: "pendiente",
      fecha: new Date(),
      total,
    };
  }
}