
import createError from "http-errors";
import { User } from "../model/user";
import { IUsersRepository } from "../repositories/IUsersRepository";



class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    executeName({ name }) {
        const UserAlreadyExists = this.usersRepository.findByName(name);

        if(UserAlreadyExists) {
            throw createError(400,"Nome já existe");
        }

       const { id } = this.usersRepository.createName( { name } );

       return id;
    }

    executeSms({ number, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(number, id);

        if(!UserAlreadyExists) {
            throw new Error("Telefone já cadastrado");
        }
        

        this.usersRepository.createSms( { number, id } );

    }

    executeSmsMessage({ code, id }): void {
        this.usersRepository.createSmsMessage( { code, id } );
    }

    executeLocale({ cep, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(cep, id);

        if(!UserAlreadyExists) {
            throw new Error("Cep já existe");
        }
        

        this.usersRepository.createLocale( { cep, id } );
    }

    executeProduto({ produto, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(produto, id);

        if(!UserAlreadyExists) {
            throw new Error("Produto já existe");
        }
        

        this.usersRepository.createProduto( { produto, id } );
    }

    executeEmail({ value, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(value, id);

        if(!UserAlreadyExists) {
            throw new Error("Email já existe");
        }

        this.usersRepository.createEmail( { value, id } );
    }

    executeEmailCode({ code, id }): void {
        this.usersRepository.createEmailCode( { code, id } );
    }

    executeSenha({ senha, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(senha, id);

        if(!UserAlreadyExists) {
            throw new Error("Senha já criada");
        }

        this.usersRepository.createSenha( { senha, id } );
    }

}

export { CreateUserService };