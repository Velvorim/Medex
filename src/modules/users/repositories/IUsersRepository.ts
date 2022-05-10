import { User } from "../model/user";



interface ICreateUserDTO {
    name: string;
    celular: string;
    cep: string;
    produto: string;
    email: string;
}

interface IUsersRepository {
    findByName(name: string): User;
    list(): User[];
    create({ name, celular, cep, produto, email }: ICreateUserDTO): void;
}

export { IUsersRepository, ICreateUserDTO };