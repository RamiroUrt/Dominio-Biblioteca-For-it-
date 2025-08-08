// import * as bcrypt from 'bcrypt';

// export class Password {
//   private readonly value: string;

//   private constructor(value: string) {
//     this.value = value;
//   }

//   static async create(plainText: string): Promise<Password> {
//     if (plainText.length < 8) {
//       throw new Error("La contraseña debe tener al menos 8 caracteres");
//     }
//     const hashed = await bcrypt.hash(plainText, 10);
//     return new Password(hashed);
//   }

//   async compare(plainText: string): Promise<boolean> {
//     return bcrypt.compare(plainText, this.value);
//   }
// }

import * as bcrypt from 'bcrypt';

export class Password {
  private constructor(private readonly hash: string) {}

  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
    const hash = await bcrypt.hash(plainPassword, 10);
    return new Password(hash);
  }

  async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hash);
  }

  toString(): string {
    return this.hash;
  }
}