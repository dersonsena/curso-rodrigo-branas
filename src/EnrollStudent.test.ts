
import { EnrollStudent } from "./EnrollStudent"

const makeSut = () => {
  return new EnrollStudent()
}

describe('Enroll Student', () => {
  it ('Should not enroll without valid student name', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Gabriel",
        cpf: "07862433688",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error("Invalid Name"));
  })

  it ('Should not enroll without valid student cpf', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Gabriel Erick Pedro Fernandes",
        cpf: "32343423212",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error("Invalid Cpf"))
  })

  it ('Should not enroll duplicated student', () => {
    const sut = makeSut();
    const enrollmentRequest1 = {
      student: {
        name: "Gabriel Erick Pedro Fernandes",
        cpf: "07862433688",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    const enrollmentRequest2 = {
      student: {
        name: "Gabriel Erick Fernandes",
        cpf: "07862433688",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    sut.execute(enrollmentRequest1);

    expect(() => sut.execute(enrollmentRequest2)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
  })

  it ('Should return student when data is valid', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Gabriel Erick Pedro Fernandes",
        cpf: "07862433688",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };
    const enrollment = sut.execute(enrollmentRequest);

    expect(enrollment.student.getName().value()).toBe('Gabriel Erick Pedro Fernandes');
    expect(enrollment.student.getCpf().value()).toBe('07862433688');
  })

  it ('Should return student when data is valid and cpf with special characters', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Gabriel Erick Pedro Fernandes",
        cpf: "078.624.336-88",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };
    const enrollment = sut.execute(enrollmentRequest);

    expect(enrollment.student.getName().value()).toBe('Gabriel Erick Pedro Fernandes');
    expect(enrollment.student.getCpf().value()).toBe('07862433688');
  })

  it('Should generate enrollment code', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Gabriel Erick Pedro Fernandes",
        cpf: "07862433688",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    const enrollment = sut.execute(enrollmentRequest);

    expect(enrollment.enrollCode).toBe((new Date()).getFullYear() + 'EM1A0001');
  })

  it ('Should not enroll student below minimum age', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "75552577426",
        birthDate: "2016-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Student below minimum age'));
  })

  it('Should not enroll student over class capacity', () => {
    const sut = makeSut();
    const enrollmentRequest = {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    };

    const cpfList = ['75552577426', '078.624.336-88', '481.110.960-03', '11854166093'];

    for (let cpf in cpfList) {
      enrollmentRequest.student.cpf = cpfList[cpf];
      sut.execute(enrollmentRequest);
    }

    enrollmentRequest.student.cpf = '98902847071';

    expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Class is over capacity'));
  })
})
