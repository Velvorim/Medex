
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";
import * as fs from 'fs';


const banco =__dirname + '/BancoJson.json';

class UsersRepository implements IUsersRepository {
 

    create({ name, celular, cep, produto, email }: ICreateUserDTO): void {
        
        const usersBanco = fs.readFileSync(banco, 'utf-8');
        
        let user = JSON.parse(usersBanco);

        const userDados = { name, celular, cep, produto, email };

        user.push(userDados);

        fs.writeFile(banco, JSON.stringify(user, null, 2), function (err) {
            if (err) throw err;
            console.log('Error on append');
        });


        fs.writeFile(banco, JSON.stringify(user, null, 2), function (err) {
            if (err) throw err;
            console.log('Error on append');
        });
    }

    list(){

        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);
        return user;
    }

    findByName(name: string) {
        const users = fs.readFileSync(banco, 'utf-8');

        let user = JSON.parse(users);

        const userExists = user.find(
            (user: { name: string; }) => user.name === name
        );
        console.log(userExists);
        return userExists;
        
    }
}

export { UsersRepository };