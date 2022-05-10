import { User } from "../model/user";
import { IUsersRepository } from "../repositories/IUsersRepository";


class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    executeName({ name }): void {
        // const UserAlreadyExists = this.usersRepository.findByName(name);

        // if(UserAlreadyExists) {
        //     throw new Error("Nome já existe")
        // }

        this.usersRepository.createName( { name } );
    }

    executeCelular({ celular, id }): void {
        // const UserAlreadyExists = this.usersRepository.findByName(name);

        // if(UserAlreadyExists) {
        //     throw new Error("Nome já existe")
        // }
        

        this.usersRepository.createCelular( { celular, id } );
    }

}

export { CreateUserService };