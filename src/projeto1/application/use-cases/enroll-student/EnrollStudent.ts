import { InvalidCpfError, InvalidStudentNameError, StudentAlreadyExistsError } from "./EnrollStudentErrors";
import { validateCpf } from '../../../validateCpf';
import { FindStudentyByCpfRepository } from "../../../domain/repositories/StudentRepositories";

export type EnrollInputBoundary = {
  student: { name?: string, cpf?: string }
}

export class EnrollStudent {
  constructor(
    private getStudentyByCpfRepository: FindStudentyByCpfRepository
  ) {}

  execute(input: EnrollInputBoundary) {
    const {student: {name = '', cpf = ''}} = input;

    if (!name.match(/^([A-Za-z]+ )+([A-Za-z])+$/)) {
      throw new InvalidStudentNameError()
    }

    if (!validateCpf(cpf)) {
      throw new InvalidCpfError()
    }

    const student = this.getStudentyByCpfRepository.findByCpf(cpf);

    if (student !== null) {
      throw new StudentAlreadyExistsError();
    }
  }
}