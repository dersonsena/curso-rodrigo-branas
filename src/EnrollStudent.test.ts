
import { EnrollStudent } from "./EnrollStudent"

const makeSut = () => {
  return new EnrollStudent()
}

describe('Enroll Student', () => {
  it ('Should not enroll without valid student name', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Ana" }};

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error("Invalid Name"));
  })

  it ('Should not enroll without valid student cpf', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Ana Maria", cpf: "32343423212" }};

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error("Invalid Cpf"))
  })

  it ('Should not enroll duplicated student', () => {
    const sut = makeSut();
    const enrollmentRequest1 = { student: { name: "Ana Maria", cpf: "71436708044" }};
    const enrollmentRequest2 = { student: { name: "Dayanny Maria", cpf: "71436708044" }};
    sut.execute(enrollmentRequest1);

    expect(() => sut.execute(enrollmentRequest2)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
  })

  it ('Should return student when data is valid', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Gabriel Erick Pedro Fernandes", cpf: "07862433688" }};
    const enrollment = sut.execute(enrollmentRequest);

    expect(enrollment.student.getName().value()).toBe('Gabriel Erick Pedro Fernandes');
    expect(enrollment.student.getCpf().value()).toBe('07862433688');
  })

  it ('Should return student when data is valid and cpf with special characters', () => {
    const sut = makeSut();
    const enrollmentRequest = { student: { name: "Gabriel Erick Pedro Fernandes", cpf: "078.624.336-88" }};
    const enrollment = sut.execute(enrollmentRequest);

    expect(enrollment.student.getName().value()).toBe('Gabriel Erick Pedro Fernandes');
    expect(enrollment.student.getCpf().value()).toBe('07862433688');
  })
})
