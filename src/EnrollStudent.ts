import { Student } from "./Student";
import data from "./data-source";

export type StudentModel = Student;

export type EnrollStudentInput = {
  student: StudentModel;
  enrollCode: string,
  level: any,
  module: any,
  enrollClass: any
};

export class EnrollStudent {
  constructor(private enrollments: EnrollStudentInput[] = []) {}

  execute(input: any) {
    const { student: { name, cpf, birthDate } } = input;
    const student = new Student(name, cpf, new Date(birthDate));
    const studentExists = this.enrollments.find(enrollment => enrollment.student.getCpf().value() === student.getCpf().value());

    if (studentExists) throw new Error("Enrollment with duplicated student is not allowed");

    const level = data.levels.find(level => level.code === input.level);
    const module = data.modules.find(module => module.code === input.module);
    const enrollClass = data.classes.find(classRow => classRow.code === input.class);
    const sequence = (this.enrollments.length + 1).toString().padStart(4, '0');
    const classCurrentOcuppation = this.enrollments.filter(enrollment => enrollment.enrollClass.code === input.class).length;

    if (module && module.minimumAge > student.getAge()) throw new Error('Student below minimum age')
    if (enrollClass && classCurrentOcuppation >= enrollClass.capacity) throw new Error('Class is over capacity')

    const levelCode = level?.code || '';
    const moduleCode = module?.code || '';
    const classCode = enrollClass?.code || '';

    const enrollCode = (new Date()).getFullYear() + levelCode + moduleCode + classCode + sequence;
    const enrollment = { student, enrollCode, level, module, enrollClass };
    this.enrollments.push(enrollment);

    return enrollment;
  }
}
