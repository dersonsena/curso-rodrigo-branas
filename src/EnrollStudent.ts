import { Student } from "./Student";

export type StudentModel = Student;

export type EnrollStudentInput = {
  student: StudentModel
}

export class EnrollStudent {
  constructor (private enrollments:EnrollStudentInput[] = []) {}

  execute(input: any) {
    const {student: {name = '', cpf = ''}} = input;
    const student = new Student(name, cpf);
    const studentExists = this.enrollments.find(enrollment => enrollment.student.getCpf().value() === student.getCpf().value());

    if (studentExists) throw new Error('Enrollment with duplicated student is not allowed');

    const enrollment = { student };
    this.enrollments.push(enrollment);

    return enrollment;
  }
}
