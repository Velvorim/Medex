import { User } from "../../model/user";
import { IUsersRepository } from "../IUsersRepository";


class UserRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    findByName(name: string): User {
        const user = this.users.find((user) => user.name === name);
        return user;
    }

    findByData(data: string): User {
        throw new Error("Method not implemented.");
    }

    
    list(): User[] {
        const all = this.users;
        return all;
    }
    createName({ name }: { name: any; }): void {
        const user = new User();

        Object.assign(user, { name });

        this.users.push(user);
    }
    createCelular({ celular, id }: { celular: any; id: any; }): void {
        throw new Error("Method not implemented.");
    }
    createCep({ cep, id }: { cep: any; id: any; }): void {
        throw new Error("Method not implemented.");
    }
    createProduto({ produto, id }: { produto: any; id: any; }): void {
        throw new Error("Method not implemented.");
    }
    createEmail({ email, id }: { email: any; id: any; }): void {
        throw new Error("Method not implemented.");
    }



}

export { UserRepositoryInMemory };