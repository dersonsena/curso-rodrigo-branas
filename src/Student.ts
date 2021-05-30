import { Cpf } from "./Cpf";
import { Name } from "./Name";

export class Student {
  private name: Name;
  private cpf: Cpf;

  constructor (name: string, cpf: string) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf.replace(/\D/g, ""));
  }

  getName(): Name {
    return this.name;
  }

  getCpf(): Cpf {
    return this.cpf
  }
}
