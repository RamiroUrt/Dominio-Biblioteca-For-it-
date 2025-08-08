
import { Plato } from "../entities/Plato";
import { Usuario } from "../entities/Usuario";
import { describe, it, expect } from "vitest";
import { CrearPedido } from '../use-cases/CrearPedido';


// Datos de prueba
const clienteTest: Usuario = {
  id: '1',
  nombre: 'Test',
  email: 'test@test.com',
  rol: 'cliente',
  password: '123456'
}

const platoTest: Plato = {
  id: '1',
  nombre: 'Pizza',
  precio: 10,
  categoria: 'principal',
  disponible: true
}

// Suite de pruebas en nivel superior
describe('CrearPedido Test Suite', () => {
  it('debe crear pedido con estado pendiente', () => {
    const pedido = CrearPedido.ejecutar(clienteTest, [platoTest])
    expect(pedido.estado).toBe('pendiente')
  })

  it('debe calcular total correctamente', () => {
    const pedido = CrearPedido.ejecutar(clienteTest, [platoTest, platoTest])
    expect(pedido.total).toBe(20)
  })
})

// Suite separada para casos de error
describe('CrearPedido Error Cases', () => {
  it('debe fallar si no hay items', () => {
    expect(() => CrearPedido.ejecutar(clienteTest, []))
      .toThrowError('El pedido no puede estar vacío')
  })
})