import { IUsersRepository } from "../repositories/IUsersRepository";


interface IRequest {
    name: string;
    celular: string;
    cep: string;
    produto: string;
    email: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ name, celular, cep, produto, email }: IRequest): void {
        const UserAlreadyExists = this.usersRepository.findByName(name);

        if(UserAlreadyExists) {
            throw new Error("Usuário já existe")
        }

        this.usersRepository.create({ name, celular, cep, produto, email });
    }
}

export { CreateUserService };