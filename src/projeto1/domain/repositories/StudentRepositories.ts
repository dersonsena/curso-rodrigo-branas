import { Student } from "../entities/Student";

export interface FindStudentyByCpfRepository {
  findByCpf(cpf: string): Student | null
}