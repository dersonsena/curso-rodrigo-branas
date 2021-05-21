import { Student } from "../../domain/entities/Student";
import { FindStudentyByCpfRepository } from "../../domain/repositories/StudentRepositories";

export class StudentInMemoryRepository implements FindStudentyByCpfRepository {
  private readonly students = [
    {name: 'Jennifer Lavínia da Rosa', cpf: '71436708044'},
    {name: 'Aurora Heloise Almada', cpf: '03764808071'},
    {name: 'Carolina Lívia Silveira', cpf: '69962322014'}
  ]

  findByCpf(cpf: string): Student | null {
    const selectedCpf = this.students.find(student => student.cpf === cpf);

    if (!selectedCpf) {
      return null;
    }

    return selectedCpf;
  }
}