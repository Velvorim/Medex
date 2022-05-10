
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';
import { User } from "../model/user";


const banco = __dirname + '/BancoJson.json';

class UsersRepository implements IUsersRepository {

    private users: User[] = [];

    constructor() {
        this.users = [];
    }


    createName({ name }: ICreateUserDTO): void {
        const user = new User();

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        Object.assign(user, {
            name,
            created_at: new Date(),
        });

        

        userData.push(user);

        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

    createCelular({ celular, id }: ICreateUserDTO): void {

        const usersBanco = fs.readFileSync(banco, 'utf-8');

        let userData = JSON.parse(usersBanco);

        const findUserId = userData.find(user => user.id === id);
        findUserId.celular = celular
        
        userData.map(function(cell){
            return findUserId
        } );
    
        fs.writeFile(banco, JSON.stringify(userData, null, 2), function (err) {
            if (err) throw err;
        });

    }

 



    findByName(name: string) {
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userExists = user.find(
            (user: { name: string; }) => user.name === name
        );

        return userExists;

    }

    list() {

        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);
        return user;
    }
}

export { UsersRepository };