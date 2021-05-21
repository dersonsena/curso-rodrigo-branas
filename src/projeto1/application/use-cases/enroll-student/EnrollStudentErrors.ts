export class InvalidStudentNameError extends Error {
  constructor () {
    super(`Invalid student`);
    this.name = 'InvalidStudentNameError';
  }
}

export class InvalidCpfError extends Error {
  constructor () {
    super(`Invalid CPF`);
    this.name = 'InvalidCpfError';
  }
}

export class StudentAlreadyExistsError extends Error {
  constructor () {
    super(`This Student Already exists`);
    this.name = 'StudentAlreadyExistsError';
  }
}

export class StudentNotFoundError extends Error {
  constructor (cpf: string) {
    super(`Student with cpf '${cpf}' wasn't found`);
    this.name = 'StudentNotFoundError';
  }
}