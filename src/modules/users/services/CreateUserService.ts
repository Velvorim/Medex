
import createError from "http-errors";
import { IUsersRepository } from "../repositories/IUsersRepository";



class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    executeName({ name }): void {
        const UserAlreadyExists = this.usersRepository.findByName(name);

        if(UserAlreadyExists) {
            throw createError(400,"Nome já existe")
        }

        this.usersRepository.createName( { name } );
    }

    executeSms({ number, id }): void {
        // const UserAlreadyExists = this.usersRepository.findByData(sms);

        // if(UserAlreadyExists) {
        //     throw new Error("Sms já existe")
        // }
        

        this.usersRepository.createSms( { number, id } );
    }

    executeSmsMessage({ code, status, verified, id }): void {
        // const UserAlreadyExists = this.usersRepository.findByData(sms);

        // if(UserAlreadyExists) {
        //     throw new Error("Sms já existe")
        // }
        

        this.usersRepository.createSmsMessage( { code, status, verified, id } );
    }

    executeLocale({ cep, id }): void {
        const UserAlreadyExists = this.usersRepository.findByData(cep);

        if(UserAlreadyExists) {
            throw new Error("Cep já existe")
        }
        

        this.usersRepository.createLocale( { cep, id } );
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