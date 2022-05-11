
import { IUsersRepository } from "../repositories/IUsersRepository";


class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    executeName({ name }): void {
        const UserAlreadyExists = this.usersRepository.findByName(name);

        if(UserAlreadyExists) {
            throw new Error("Nome já existe")
        }

        this.usersRepository.createName( { name } );
    }

    executeCelular({ celular, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(celular);

        if(UserAlreadyExists) {
            throw new Error("Celular já existe")
        }
        

        this.usersRepository.createCelular( { celular, id } );
    }

    executeCep({ cep, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(cep);

        if(UserAlreadyExists) {
            throw new Error("Cep já existe")
        }
        

        this.usersRepository.createCep( { cep, id } );
    }

    executeProduto({ produto, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(produto);

        if(UserAlreadyExists) {
            throw new Error("Produto já existe")
        }
        

        this.usersRepository.createProduto( { produto, id } );
    }

    executeEmail({ email, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(email);

        if(UserAlreadyExists) {
            throw new Error("Email já existe")
        }
        

        this.usersRepository.createEmail( { email, id } );
    }

}

export { CreateUserService };