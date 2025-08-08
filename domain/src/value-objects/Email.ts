// export class Email {
//   private readonly value: string;

//   constructor(email: string) {
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       throw new Error("Email inválido");
//     }
//     this.value = email;
//   }

//   toString(): string {
//     return this.value;
//   }
// }

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.esEmailValido(email)) {
      throw new Error("Formato de email inválido");
    }
    this.value = email;
  }

  private esEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }
}