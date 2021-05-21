import { StudentNotFoundError } from "../../application/use-cases/enroll-student/EnrollStudentErrors";
import { Student } from "../../domain/entities/Student";
import { FindStudentyByCpfRepository, StudentExistsRepository } from "../../domain/repositories/StudentRepositories";

export class StudentInMemoryRepository implements FindStudentyByCpfRepository, StudentExistsRepository {
  private readonly students = [
    {completeName: 'Jennifer Lavínia da Rosa', cpfNumber: '71436708044'},
    {completeName: 'Aurora Heloise Almada', cpfNumber: '03764808071'},
    {completeName: 'Carolina Lívia Silveira', cpfNumber: '69962322014'}
  ]

  findByCpf(cpf: string): Student {
    const studentRecord = this.students.find(record => record.cpfNumber === cpf);

    if (!studentRecord) {
      throw new StudentNotFoundError(cpf);
    }

    return new Student(studentRecord.completeName, studentRecord.cpfNumber);
  }

  exists(cpf: string): boolean {
    return this.students.find(student => student.cpfNumber === cpf) !== undefined
  }
}