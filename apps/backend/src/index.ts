

import express from "express";
import { CrearPedido } from "../../../domain/src/use-cases/CrearPedido";
import { PedidoRepositoryMemory } from "../../../domain/src/repositories/PedidoRepository";
import { UsuarioRepositoryMemory } from "../../../domain/src/repositories/UsuarioRepository";
import { RegistrarUsuario } from "../../../domain/src/use-cases/RegistrarUsuario";

const app = express();
app.use(express.json());

// Inicializar repositorios
const pedidoRepo = new PedidoRepositoryMemory();
const usuarioRepo = new UsuarioRepositoryMemory();

// Middleware para validar datos básicos
app.use(express.json());

// Registrar usuario de ejemplo (para pruebas)
async function seedDatabase() {
  await new RegistrarUsuario(usuarioRepo).execute({
    nombre: "Cliente Ejemplo",
    email: "cliente@test.com",
    password: "password123",
    rol: "cliente"
  });
}
seedDatabase();

// Endpoint para crear pedidos
app.post("/pedidos", async (req, res) => {
  try {
    const { clienteId, items } = req.body;

    // 1. Validar cliente existente
    const cliente = await usuarioRepo.buscarPorEmail(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // 2. Crear pedido
    const pedido = CrearPedido.ejecutar(cliente, items);
    
    // 3. Guardar en repositorio
    await pedidoRepo.guardar(pedido);

    res.status(201).json(pedido);
  } catch (error) {
    handleError(res, error);
  }
});

// Nuevo endpoint para registro de usuarios
app.post("/auth/registro", async (req, res) => {
  try {
    const usuario = await new RegistrarUsuario(usuarioRepo).execute(req.body);
    res.status(201).json({ 
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol 
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Helper para manejo de errores
function handleError(res: express.Response, error: unknown) {
  const errorMessage = error instanceof Error ? error.message : "Error desconocido";
  res.status(400).json({ error: errorMessage });
}

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});