import { StudentInMemoryRepository } from "../../../infra/repositories/StudentInMemoryRepository";
import { EnrollStudent } from "./EnrollStudent";
import { InvalidCpfError, InvalidStudentNameError, StudentAlreadyExistsError } from "./EnrollStudentErrors";

const makeSut = () => {
  const studentRepository = new StudentInMemoryRepository();
  return new EnrollStudent(studentRepository, studentRepository)
}

describe('Enroll Student', () => {
  it ('Should not enroll without valid student name', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Ana" }};

    expect(() => sut.execute(enrollmentRequest)).toThrow(new InvalidStudentNameError());
  })

  it ('Should not enroll without valid student cpf', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Ana Maria", cpf: "32343423212" }};

    expect(() => sut.execute(enrollmentRequest)).toThrow(new InvalidCpfError())
  })

  it ('Should not enroll duplicated student', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Ana Maria", cpf: "71436708044" }};

    expect(() => sut.execute(enrollmentRequest)).toThrow(new StudentAlreadyExistsError())
  })

  it ('Should return student when data is valid', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Gabriel Erick Pedro Fernandes", cpf: "07862433688" }};
    const student = sut.execute(enrollmentRequest);

    expect(student.getName()).toBe('Gabriel Erick Pedro Fernandes');
    expect(student.getCpf()).toBe('07862433688');
  })

  it ('Should return student when data is valid and cpf with special characters', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Gabriel Erick Pedro Fernandes", cpf: "078.624.336-88" }};
    const student = sut.execute(enrollmentRequest);

    expect(student.getName()).toBe('Gabriel Erick Pedro Fernandes');
    expect(student.getCpf()).toBe('07862433688');
  })
})