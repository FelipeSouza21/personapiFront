import { Phones } from "./phones.model";

export interface Person {
    id?: number
    firstName: string
    lastName: string
    cpf: string
    birthDate?: string
    phones: Phones[]
}
