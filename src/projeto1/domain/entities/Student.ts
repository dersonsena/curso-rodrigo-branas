import { InvalidStudentNameError } from "../../application/use-cases/enroll-student/EnrollStudentErrors";

export class Student {
  private name: string;
  private cpf: string;

  constructor (name: string, cpf: string) {
    if (!name.match(/^([A-Za-z]+ )+([A-Za-z])+$/)) {
      throw new InvalidStudentNameError()
    }

    this.name = name;
    this.cpf = cpf.replace(/\D/g, "");
  }

  getName() {
    return this.name
  }

  getCpf() {
    return this.cpf
  }
}