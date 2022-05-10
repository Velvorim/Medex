import { User } from "../model/user";

interface ICreateUserDTO {
    id: string;
    name: string;
    celular: string;
    cep: string;
    produto: string;
    email: string;
}

interface IUsersRepository {
    // findByName(name: string): User;
    list(): User[];
    createName({ name }): void;
    createCelular({ celular, id }): void;

}

export { IUsersRepository, ICreateUserDTO};