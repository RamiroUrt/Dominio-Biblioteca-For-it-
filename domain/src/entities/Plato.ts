export interface Plato {
  id: string;
  nombre: string;
  precio: number;
  categoria: "entrante" | "principal" | "postre";
  disponible: boolean;
}