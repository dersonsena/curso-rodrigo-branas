import { StudentInMemoryRepository } from "../../../infra/repositories/StudentInMemoryRepository";
import { EnrollStudent } from "./EnrollStudent";
import { InvalidCpfError, InvalidStudentNameError, StudentAlreadyExistsError } from "./EnrollStudentErrors";

const makeSut = () => {
  const studentRepository = new StudentInMemoryRepository();
  return new EnrollStudent(studentRepository)
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
})