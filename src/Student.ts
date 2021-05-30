import { Cpf } from "./Cpf";
import { Name } from "./Name";

export class Student {
  private name: Name;
  private cpf: Cpf;
  private birthDate: Date;

  constructor (name: string, cpf: string, birthDate: Date) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf.replace(/\D/g, ""));
    this.birthDate = birthDate;
  }

  getName(): Name {
    return this.name;
  }

  getCpf(): Cpf {
    return this.cpf
  }

  getAge(): number {
    return new Date().getFullYear() - this.birthDate.getFullYear()
  }
}
