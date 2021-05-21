import { InvalidCpfError, InvalidStudentNameError, StudentAlreadyExistsError } from "./EnrollStudentErrors";
import { validateCpf } from '../../../validateCpf';
import { FindStudentyByCpfRepository, StudentExistsRepository } from "../../../domain/repositories/StudentRepositories";
import { Student } from "../../../domain/entities/Student";

export type EnrollInputBoundary = {
  student: { name?: string, cpf?: string }
}

export type OutputBoundary = Student

export class EnrollStudent {
  constructor(
    private getStudentyByCpfRepository: FindStudentyByCpfRepository,
    private studentExistsRepository: StudentExistsRepository
  ) {}

  execute(input: EnrollInputBoundary): OutputBoundary {
    const {student: {name = '', cpf = ''}} = input;
    const studentEntity = new Student(name, cpf);

    if (!validateCpf(studentEntity.getCpf())) {
      throw new InvalidCpfError()
    }
    
    if (this.studentExistsRepository.exists(studentEntity.getCpf())) {
      throw new StudentAlreadyExistsError();
    }

    return studentEntity;
  }
}