import { Pedido } from "../entities/Pedido";

export interface IPedidoRepository {
  guardar(pedido: Pedido): Promise<void>;
  buscarPorId(id: string): Promise<Pedido | null>;
  listarPorUsuario(usuarioId: string): Promise<Pedido[]>;
}

// Implementación en memoria
export class PedidoRepositoryMemory implements IPedidoRepository {
  private pedidos: Pedido[] = [];

  async guardar(pedido: Pedido): Promise<void> {
    this.pedidos.push(pedido);
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return this.pedidos.find(p => p.id === id) || null;
  }

  async listarPorUsuario(usuarioId: string): Promise<Pedido[]> {
    return this.pedidos.filter(p => p.cliente.id === usuarioId);
  }
}