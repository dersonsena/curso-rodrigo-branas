import { Student } from "../entities/Student";

export interface FindStudentyByCpfRepository {
  findByCpf(cpf: string): Student
}

export interface StudentExistsRepository {
  exists(cpf: string): boolean
}